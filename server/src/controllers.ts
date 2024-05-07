import { Request, Response } from "express";
import { generateEmbeddings } from "./utils.js";

export const queryController = async (req: Request, res: Response) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: "Query parameter is required." });
    }
    const embeddings = await generateEmbeddings(query);
    return res.status(200).json(embeddings);
  } catch (e) {
    return res
      .status(500)
      .json({ error: "An internal server error occurred." });
  }
};
