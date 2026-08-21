import { deleteAvatar, avatarImage } from "../controller/avatar.js";
import { authentification } from "../middleware/auth-middleware.js";
import { Router } from "express";
import upload from "../controller/upload-images.js";

const router = Router();

router.post("/", authentification, upload.single("avatar"), avatarImage);
router.delete("/:avatarId", authentification, deleteAvatar);

export default router;
