import dotenv from "dotenv";
import { pipeline } from "@xenova/transformers";
import { Pinecone } from "@pinecone-database/pinecone";

dotenv.config();
const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const pc = new Pinecone({
  apiKey: PINECONE_API_KEY,
});

export const PORT = process.env.PORT;
export const PIPE = await pipeline(
  "feature-extraction",
  "mixedbread-ai/mxbai-embed-large-v1"
);
export const index = pc.index("query-pdf-docs");
