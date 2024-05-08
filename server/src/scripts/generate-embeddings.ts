import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { v4 as uuidv4 } from "uuid";
import { generateEmbeddings } from "../utils.js";
import { index } from "../config.js";

// Load content from pdf document
const loader = new PDFLoader(
  "/Users/kishankokal/repos/query-pdf-docs/docs/book.pdf",
  { parsedItemSeparator: "" }
);

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});

const docs = await loader.load();

// Remove unnecessary new lines from the extracted text
for (const doc of docs) {
  doc.pageContent = doc.pageContent.replace(/\n\s*/g, " ");
}

const splitDocs = await splitter.splitDocuments(docs);

// Preprocess the content, generate embeddings and upsert to Pinecone
let docsForPinecone = [];

for (const doc of splitDocs) {
  docsForPinecone.push({
    id: uuidv4(),
    values: await generateEmbeddings(doc.pageContent),
    metadata: {
      source: doc.metadata.source,
      content: doc.pageContent,
      pageNumber: doc.metadata.loc.pageNumber,
    },
  });
  if (docsForPinecone.length === 10) {
    await index.upsert(docsForPinecone);
    docsForPinecone = [];
  }
  console.log(doc.metadata.loc.pageNumber);
}
