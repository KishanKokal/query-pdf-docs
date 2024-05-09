import express, { Express } from "express";
import { PORT } from "./config.js";
import { queryController } from "./controllers.js";
import cors from "cors";

const app: Express = express();
app.use(express.json());
app.use(cors());

app.post("/api/query", queryController);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
