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
const PORT = process.env.PORT || 5000;

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

import { exec } from "child_process";

app.get('/api/secret-seed', (req, res) => {
    exec('node seeds/seedLarge.js', (err, stdout, stderr) => {
        if (err) return res.send("Trigger Error: " + err.message);
        res.send("Seeding complete! Log: " + stdout);
    });
});

const startServer = async () => {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();
