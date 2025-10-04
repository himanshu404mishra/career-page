import express, { application } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { configDotenv } from "dotenv";
import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import jobRoutes from "./routes/job.route.js";
import applicationRoutes from "./routes/application.route.js";

// express app
const app = express();

// for logging details of requests and response on terminal
app.use(morgan("dev"));
// configuring dotenv
configDotenv();

// builtin middlewares for parsing and sending jsons
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// for parsing cookies
app.use(cookieParser());

// for CORS
app.use(
  cors({
    origin: "https://career-page-21ju.vercel.app",
    credentials: true,
  })
);

// routes
app.use("/api/auth", authRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/application", applicationRoutes);

// defining ports
const PORT = process.env.PORT || 3000;

connectDB();

// server starting here
app.listen(PORT, () => {
  console.log(`SERVER is Running on http://localhost:${PORT}`);
});
