import express from "express";
import { 
  login, 
  register, 
  verifyResetToken,
  forgotPassword,
  resetPassword,
  updateUserRole
} from "../controllers/user.controller.js";
import { isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);

// Password reset routes
router.get("/verify-reset-token/:token", verifyResetToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Admin-only routes
router.patch("/users/:userId/role", isAdmin, updateUserRole);

export default router;
