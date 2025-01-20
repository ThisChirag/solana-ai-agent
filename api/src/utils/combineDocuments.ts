import { Document } from "@langchain/core/documents";

export const combineDocs = (docs: Document[]): string => {
    return docs.map((doc) => doc.pageContent).join('\n\n');
};

