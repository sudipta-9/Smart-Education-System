import express from "express";
const app = express();
import "dotenv/config";
import cors from 'cors';
import router from "./router/index.js";

app.use(cors());
app.use(express.json());
app.use("/api/v1", router);

const port = process.env.PORT;
app.listen(port, () => {
  console.log("server listen on port "+port);
}); 
