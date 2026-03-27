import { Router } from "express";
import protect from "../middlewares/authMiddleware.js";
import { getCurrentUser, updateUserSettings } from "../controllers/userController.js";

const router = Router();

router.get("/me", protect, getCurrentUser);
router.put("/settings", protect, updateUserSettings);

export default router;
