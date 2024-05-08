import { PIPE, index } from "./config.js";

export const generateEmbeddings = async (query: string): Promise<number[]> => {
  const embeddings = await PIPE(query, {
    normalize: true,
    pooling: "mean",
  });
  const result = embeddings.tolist()[0];
  return result;
};

export const fetchRelevantDocs = async (embedding: number[]) {
  const result = await index.query({
    topK: 5,
    vector: embedding,
    includeMetadata: true,
  });
  return result;
}
