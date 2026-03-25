import { Router } from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  getNutritionEntries,
  createNutritionEntry,
  updateNutritionEntry,
  deleteNutritionEntry,
} from "../controllers/nutritionController.js";

const router = Router();

router.use(protect);

router.get("/", getNutritionEntries);
router.post("/", createNutritionEntry);
router.put("/:id", updateNutritionEntry);
router.delete("/:id", deleteNutritionEntry);

export default router;
