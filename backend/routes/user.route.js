import express from "express";
import { 
  login, 
  register, 
  verifyResetToken,
  forgotPassword,
  resetPassword
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);

// Password reset routes
router.get("/verify-reset-token/:token", verifyResetToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
