import express, { Router } from "express";
import { askQuestion } from "../controllers/questionController";

const router = Router();

router.post("/ask", askQuestion);

export default router;
