import { QdrantClient } from "@qdrant/js-client-rest";
import { OpenAIEmbeddings } from "@langchain/openai";
import csvParser from "csv-parser";
import dotenv from "dotenv";
import { QdrantVectorStore } from "@langchain/qdrant";
import fs from "fs";
import path from "path";

dotenv.config();
console.log(process.env.OPENAI_API_KEY);

const qdrantUrl = process.env.QDRANT_URL || "";
const openAiKey = process.env.OPENAI_API_KEY || "";
const filePath = process.env.FILE_PATH || "";

const qdrantClient = new QdrantClient({ url: qdrantUrl });
const embeddings = new OpenAIEmbeddings({
  openAIApiKey: openAiKey || "",
  model: "text-embedding-ada-002",
});

async function createCollection() {
  try {
    const collectionName = "solana_vectors";
    const dimension = 1536;
    const collectionsResponse = await qdrantClient.getCollections();
    const collections = collectionsResponse.collections || [];

    const exists = collections.some(
      // @ts-ignore
      (collection) => collection.name === collectionName
    );

    if (!exists) {
      await qdrantClient.createCollection(collectionName, {
        vectors: {
          size: dimension,
          distance: "Cosine",
        },
      });
      console.log(`Collection '${collectionName}' created successfully.`);
    } else {
      console.log(
        `Collection '${collectionName}' already exists. Skipping creation.`
      );
    }
  } catch (error) {
    console.error("Error creating collection:", error);
  }
}

export const storeCSVEmbeddings = async (
  csvFilePath: string,
  batchSize: number = 100
) => {
  try {
    const absoluteFilePath = path.resolve(csvFilePath);

    if (!fs.existsSync(absoluteFilePath)) {
      throw new Error(`CSV file not found at path: ${absoluteFilePath}`);
    }

    console.log("Processing CSV...");
    let embeddedRowCount = 0;

    while (
      fs.existsSync(absoluteFilePath) &&
      fs.statSync(absoluteFilePath).size > 0
    ) {
      console.log("Reading a batch of rows...");
      const records: any[] = [];
      const remainingRows: string[] = [];

      const fileStream = fs.createReadStream(absoluteFilePath);
      const parser = fileStream.pipe(csvParser());

      for await (const row of parser) {
        embeddedRowCount++;
        if (records.length < batchSize) {
          records.push({
            id: row["id"],
            title: row["title"],
            description: row["description"],
            content: row["content"],
          });
        } else {
          remainingRows.push(Object.values(row).join(","));
        }
      }

      console.log(`Processing batch of size ${records.length}...`);
      await processBatch(records);

      console.log("Generated embeddings for ", embeddedRowCount);
      console.log("Rewriting CSV with remaining rows...");
      fs.writeFileSync(absoluteFilePath, remainingRows.join("\n"), "utf-8");
    }

    console.log("All data processed.");
  } catch (error) {
    console.error("Error in storeCSVEmbeddings:", error);
  }
};

const getTokenCount = (text: string) => {
  return text.split(/\s+/).length * 4;
};

const processBatch = async (records: any[]) => {
  const embeddingsData = await Promise.all(
    records.map(async (record) => {
      let text = `Title: ${record.title} Description: ${record.description}`;

      const tokenCount = getTokenCount(text);
      const maxTokens = 8192;

      const chunks = [];
      if (tokenCount > maxTokens) {
        const chunkSize = Math.floor(maxTokens / 2);
        while (text.length > chunkSize) {
          chunks.push(text.slice(0, chunkSize));
          text = text.slice(chunkSize);
        }
        chunks.push(text);
        console.log(
          `Text split into ${chunks.length} chunks due to token limit.`
        );
      } else {
        chunks.push(text);
      }

      const embeddingPromises = chunks.map((chunk) =>
        embeddings.embedQuery(chunk)
      );

      const vectors = await Promise.all(embeddingPromises);

      const vector = vectors.reduce((acc, curr) => acc.concat(curr), []);

      return {
        pageContent: text,
        metadata: {
          id: record.id,
          title: record.title,
          description: record.description,
          content: record.content,
        },
        embedding: vector,
      };
    })
  );

  console.log(
    `Embeddings generated for batch of size ${records.length}. Storing in Qdrant...`
  );

  await QdrantVectorStore.fromDocuments(embeddingsData, embeddings, {
    client: qdrantClient,
    collectionName: "solana_vectors",
  });

  console.log(`Batch stored successfully in Qdrant.`);
};

(async () => {
  await createCollection();
  console.log("started creating and storing embeddings");
  await storeCSVEmbeddings(filePath);
})();
