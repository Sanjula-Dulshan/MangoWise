dotenv.config();
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db_config.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import chalk from "chalk";

const app = express();

//server run in this port 8070
const PORT = process.env.PORT || 8070;

//Connect data base
connectDB();



app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json("Server Online");
})


app.listen(PORT, () => {
  console.log(chalk.blue.bold('[Server]') + chalk.white.bold(' : Node server is running on port ') + chalk.green.bold(PORT));
});
