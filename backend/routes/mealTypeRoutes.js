import express from "express";
import {
  getMealTypes,
  createMealType,
  deleteMealType,
  updateMealType,
} from "../controllers/mealTypeController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getMealTypes);

router.post("/", protect, createMealType);

router.put("/:id", protect, updateMealType);

router.delete("/:id", protect, deleteMealType);

export default router;