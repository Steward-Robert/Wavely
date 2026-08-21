import { Router } from "express";
import {
  commentaire,
  deleteComment,
  allComment,
  updateCommentaire,
} from "../controller/comment-controller.js";
import { authentification } from "../middleware/auth-middleware.js";

const CommentRouter = Router();
CommentRouter.get("/", allComment);
CommentRouter.post("/:postId", authentification, commentaire);
CommentRouter.put("/:id", authentification, updateCommentaire);
CommentRouter.delete("/:id", authentification, deleteComment);

export default CommentRouter;
