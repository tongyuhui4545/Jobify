import express from "express";
import "express-async-errors";
import morgan from "morgan";
import cookieParser from 'cookie-parser'
import * as dotenv from "dotenv";

import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import mongoose from "mongoose";
import {body, validationResult} from 'express-validator'
import { authenticateUser } from "./middleware/authMiddleware.js";
//router
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/app/v1/jobs", authenticateUser, jobRouter);
app.use("/app/v1/auth", authenticateUser, userRouter);
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
