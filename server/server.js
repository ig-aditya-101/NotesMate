import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import connectDB from "./config/db.js";
import collegeRouter from "./routes/college.js";
import authRouter from "./routes/auth.js";
import noteRouter from "./routes/note.js";
import leaderBoardRouter from "./routes/leaderBoard.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
});

app.use(globalLimiter);
app.use("/api/auth/login", loginLimiter);

app.use("/api/colleges", collegeRouter);
app.use("/api/auth", authRouter);
app.use("/api/notes", noteRouter);
app.use("/api/leaderboard", leaderBoardRouter);

const startServer = async () => {
  await connectDB();

  app.listen(process.env.PORT || 5000,"0.0.0.0", () => {
    console.log("Server running on port 5000");
  });
};

startServer();
