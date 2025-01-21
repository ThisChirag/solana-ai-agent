import { Request, Response } from "express";
import { getAnswer } from "../services/answerService";
import prisma from "../config";

export const askQuestion = async (req: Request, res: Response): Promise<any> => {
  try {
    const { question } = req.body;
    const username = "Solana Developer"; // Default username

    // First, ensure anonymous user exists
    let user = await prisma.user.findUnique({
      where: { name: username },
    });

    // If anonymous user doesn't exist, create it
    if (!user) {
      user = await prisma.user.create({
        data: {
          name: username,
          email: "anonymous@example.com",
          profile: "https://avatars.githubusercontent.com/u/0",
        },
      });
    }

    const chatHistory = await prisma.chat.findMany({
      where: {
        userName: username,
      },
      orderBy: { createdAt: 'asc' },
    });

    const history = chatHistory.map((chat: any) =>
      chat.isResponse ? `A: ${chat.message}` : `Q: ${chat.message}`
    );

    await prisma.chat.create({
      data: {
        message: question,
        isResponse: false,
        userName: username,
      },
    });

    const answer = await getAnswer(question, history);

    await prisma.chat.create({
      data: {
        message: answer,
        isResponse: true,
        userName: username,
      },
    });

    res.status(200).json({ answer });
  } catch (error) {
    console.error("Error fetching answer:", error);
    res.status(500).json({ message: "Error fetching answer", error });
  }
};

