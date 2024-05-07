import { PIPE } from "./config.js";

export const generateEmbeddings = async (query: string): Promise<number[]> => {
  const embeddings = await PIPE(query, {
    normalize: true,
    pooling: "mean",
  });
  const result = embeddings.tolist()[0];
  return result;
};
