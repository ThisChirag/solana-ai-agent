import { QdrantClient } from "@qdrant/js-client-rest";
import { OpenAIEmbeddings } from "@langchain/openai";
import dotenv from "dotenv";
import { QdrantVectorStore } from "@langchain/qdrant";

dotenv.config();

const qdrantUrl = process.env.QDRANT_URL || "http://localhost:6333";
const openAiKey = process.env.OPENAI_API_KEY;

const qdrantClient = new QdrantClient({ url: qdrantUrl });
const embeddings = new OpenAIEmbeddings({
  openAIApiKey: openAiKey || "",
  model: "text-embedding-ada-002",
});

const vectorStore = new QdrantVectorStore(embeddings, {
  client: qdrantClient,
  collectionName: "solana_vectors",
});

export const retriever = vectorStore.asRetriever();
