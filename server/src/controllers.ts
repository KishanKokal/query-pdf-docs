import { Request, Response } from "express";
import { generateEmbeddings, fetchRelevantDocs } from "./utils.js";

interface requestBody {
  query: string;
}

export const queryController = async (req: Request, res: Response) => {
  try {
    const { query }: requestBody = req.body;
    if (!query) {
      return res.status(400).json({ error: "Query parameter is required." });
    }
    const embeddings = await generateEmbeddings(query);
    const result = await fetchRelevantDocs(embeddings);
    return res.status(200).json(result);
  } catch (e) {
    return res
      .status(500)
      .json({ error: "An internal server error occurred." });
  }
};
