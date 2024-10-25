import express from "express";
import "express-async-errors";
import morgan from "morgan";
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary'
import * as dotenv from "dotenv";
//middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import mongoose from "mongoose";
import { body, validationResult } from 'express-validator'
import { authenticateUser } from "./middleware/authMiddleware.js";
//router
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
//public
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

const __dirname = dirname(fileURLToPath(import.meta.url))

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.static(path.resolve(__dirname, './public')))
app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authenticateUser, userRouter)

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
