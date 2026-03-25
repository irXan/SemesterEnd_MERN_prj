import { Router } from "express";
import protect from "../middlewares/authMiddleware.js";
import getCurrentUser from "../controllers/userController.js";

const router = Router();

router.get("/me", protect, getCurrentUser);

export default router;
