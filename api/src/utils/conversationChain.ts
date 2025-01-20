import "dotenv/config";

import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { combineDocs } from "./combineDocuments";
import dotenv from 'dotenv'
import { retriever } from "../services/embeddingService";
dotenv.config()

const openAIApiKey: string = process.env.OPENAI_API_KEY || "";
const llm = new ChatOpenAI({ openAIApiKey, temperature: 0, streaming: true });

const standaloneQuestionTemplate = `Given  question, convert the question to a standalone question. 
question: {question} 
standalone question:`;

const standaloneQuestionPrompt = PromptTemplate.fromTemplate(
  standaloneQuestionTemplate
);

const answerTemplate: string = `
You are a helpful support assistant. Use the provided context and conversation history to answer the user's question. If the exact information isn't available, try to provide an answer using the most relevant or similar data.

Always follow these rules when responding:
1. Format all code examples using proper markdown with triple backticks and language specification
2. For Rust code, use \`\`\`rust
3. For TypeScript code, use \`\`\`typescript
4. For Shell commands, use \`\`\`bash
5. Always provide complete, working code examples
6. Include brief explanations before and after code blocks

**Conversation History:**
{history}

**Context from Database:**
{context}

**User's Question:**
{question}

**Response:**
If exact information is available:
- Refer to the relevant data and respond using the content and description.
Otherwise:
- Provide a thoughtful answer based on similar data or general knowledge.

Answer:
`;

const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);

const standaloneQuestionChain = standaloneQuestionPrompt
  .pipe(llm)
  .pipe(new StringOutputParser());

const retrieverChain = RunnableSequence.from([
  (prevResult) => prevResult.standalone_question,
  retriever,
  combineDocs,
]);

const answerChain = answerPrompt.pipe(llm).pipe(new StringOutputParser());

const chain = RunnableSequence.from([
  {
    standalone_question: standaloneQuestionChain,
    original_input: new RunnablePassthrough(),
  },
  {
    context: retrieverChain,
    question: ({ original_input }) => original_input.question,
    history: ({ original_input }) => original_input.history.join(" "),
  },
  answerChain,
]);

export { chain };
