import express from "express";
import "express-async-errors";
import morgan from "morgan";
import * as dotenv from "dotenv";

import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import mongoose from "mongoose";
import {body, validationResult} from 'express-validator'

//router
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";

dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/app/v1/jobs", jobRouter);
app.use("/app/v1/auth", authRouter);

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
} catch (error) {
  console.log(1);
  process.exit(1);
}
