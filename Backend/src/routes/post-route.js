import { Router } from "express";
import { authentification } from "../middleware/auth-middleware.js";
import {
  post,
  deletePost,
  updatePost,
  allPost,
} from "../controller/post-controller.js";
import upload from "../controller/upload-images.js";

const postRouter = Router();

postRouter.post("/", authentification, upload.single("image"), post);
postRouter.delete("/:postId", authentification, deletePost);
postRouter.put("/:postId", authentification, updatePost);
postRouter.get("/", authentification, allPost);

export default postRouter;
