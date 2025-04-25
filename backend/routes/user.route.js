import express from "express";
import { 
  login, 
  register, 
  forgotPassword, 
  verifyResetToken, 
  resetPassword 
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);

// Password reset routes
router.post("/forgot-password", forgotPassword);
router.get("/verify-reset-token/:token", verifyResetToken);
router.post("/reset-password/:token", resetPassword);

export default router;
