import express, { Express } from "express";
import { PORT } from "./config.js";
import { queryController } from "./controllers.js";

const app: Express = express();
app.use(express.json());

app.post("/api/query", queryController);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
