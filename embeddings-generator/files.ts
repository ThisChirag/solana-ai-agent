import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { json2csv } from "json-2-csv";

const cookbookPath = path.resolve(__dirname, "files") 

// @ts-ignore
const recursivelyReadFiles = async (dir: string) => {
  const files = await fs.readdir(dir, { withFileTypes: true });
  // @ts-ignore
  const filePaths = await Promise.all(
    // @ts-ignore
    files.map(async (file: any) => {
      if (file.isDirectory()) {
        return recursivelyReadFiles(path.resolve(dir, file.name));
      }
      return path.resolve(dir, file.name);
    })
  );

  return filePaths.flat();
  // return files.map((file) => file.name);
};

const readFile = async (filePath: string) => {
  return await fs.readFile(filePath, "utf8");
};

interface IMarkDownContent {
  id: number;
  title: string;
  description: string;
  metaOnly?: boolean;
  content: string;
}

export const getMarkDownContent = async () => {
  const files = await recursivelyReadFiles(cookbookPath);
  const fileContents = await Promise.all(files.map(readFile));
  // @ts-ignore
  const markDownContent = fileContents.map((content, index) => {
    const data = matter(content);
    console.log(typeof data);

    return {
      id: index,
      ...data.data,
      content: data.content,
    };
  }) as IMarkDownContent[];

  const filteredMarkDownContent = markDownContent
    .filter((content) => !content.metaOnly)
    .map((content) => {
      return {
        id: content.id,
        title: content.title,
        description: content.description,
        content: content.content,
      };
    });
  saveCsv(filteredMarkDownContent);

  return filteredMarkDownContent;
};

function saveCsv(filteredMarkDownContent: IMarkDownContent[]) {
  const csv = json2csv(filteredMarkDownContent);
  return fs.writeFile("embeddings.csv", csv);
}

getMarkDownContent();
