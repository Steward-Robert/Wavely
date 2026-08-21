import { Router } from "express";
import { like, unlike } from "../controller/like-controller.js";
import { authentification } from "../middleware/auth-middleware.js";

const likeRouter = Router();

likeRouter.post("/:postId", authentification, like);
likeRouter.delete("/:postId", authentification, unlike);

export default likeRouter;
