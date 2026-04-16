import { Router } from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  getExercises,
  createExercise,
  updateExercise,
  deleteExercise,
} from "../controllers/exerciseController.js";

const router = Router();

router.use(protect);

router.get("/", getExercises);
router.post("/", createExercise);
router.put("/:id", updateExercise);
router.delete("/:id", deleteExercise);

export default router;