import { Router } from "express";
import {
  registerUser,
  loginUser,
  logout,
  getMe,
} from "../controller/auth-controller.js";
import { authentification } from "../middleware/auth-middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);
router.get("/me", authentification, getMe);

export default router;
