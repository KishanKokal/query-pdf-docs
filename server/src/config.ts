import dotenv from "dotenv";
import { pipeline } from "@xenova/transformers";
dotenv.config();

export const PORT = process.env.PORT;
export const PIPE = await pipeline(
  "feature-extraction",
  "mixedbread-ai/mxbai-embed-large-v1"
);
