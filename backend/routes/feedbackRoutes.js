import { Router } from "express";
import protect from "../middlewares/authMiddleware.js";
import { createFeedback, getMyFeedback } from "../controllers/feedbackController.js";

const router = Router();

router.use(protect);
router.get("/", getMyFeedback);
router.post("/", createFeedback);

export default router;
