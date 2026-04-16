import { Router } from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  getWorkouts,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} from "../controllers/workoutController.js";

const router = Router();

router.use(protect);

router.get("/", getWorkouts);
router.post("/", createWorkout);
router.put("/:id", updateWorkout);
router.delete("/:id", deleteWorkout);

export default router;
