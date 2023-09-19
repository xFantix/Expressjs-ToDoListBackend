import * as dotenv from "dotenv";
import express from "express";

dotenv.config();

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || "8080";

const app = express();

app.get("/", (req, res) => {
  res.send("TEST");
});

app.listen(port);
