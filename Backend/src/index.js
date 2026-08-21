import express from "express";
import { prisma } from "./db.js";
import cors from "cors";
import "dotenv/config";
import route from "./routes/auth-route.js";
import cookieParser from "cookie-parser";
import CommentRouter from "./routes/comment-route.js";
import postRouter from "./routes/post-route.js";
import likeRouter from "./routes/like-route.js";
import avatarRouter from "./routes/avatar.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/avatar", avatarRouter);
app.use("/api/auth", route);
app.use("/api/post", postRouter);
app.use("/api/comment", CommentRouter);
app.use("/api/like", likeRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});
