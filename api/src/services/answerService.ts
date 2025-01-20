import { chain } from "../utils/conversationChain";

export const getAnswer = async (question: string, history: string[]) => {
  // const optionString = options?.join(", ") || ""
  // const payload = question + " " + optionString

  const response = await chain.invoke({ question: question, history: history });
  return response;
};
