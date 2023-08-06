dotenv.config();
import bodyParser from "body-parser";
import chalk from "chalk";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db_config.js";

//import route files
import DiseasePredictionRoute from "./routes/Disease/Prediction.routes.js";
import SaveRecordsRoute from "./routes/FertilizerSuggestion/SaveRecordsRoute.js";
import SuitableQuantityRoute from "./routes/FertilizerSuggestion/SuitableQuantityRoute.js";

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
});

//Define routes
app.use("/fertilizer", SuitableQuantityRoute);
app.use("/records", SaveRecordsRoute);
app.use("/disease", DiseasePredictionRoute);

app.listen(PORT, () => {
  console.log(
    chalk.blue.bold("[Server]") +
      chalk.white.bold(" : Node server is running on port ") +
      chalk.green.bold(PORT)
  );
});
