import Nutrition from "../models/Nutrition.js";
import emitNotification from "../utils/emitNotification.js";

const getNutritionEntries = async (req, res) => {
  try {
    const entries = await Nutrition.find({ user: req.user._id })
    .populate("mealType", "name")
    .sort({
      mealDate: -1,
      createdAt: -1,
    });

    res.json({ entries });
  } catch (error) {
    res.status(500).json({ message: "Server error while loading nutrition entries" });
  }
};

const createNutritionEntry = async (req, res) => {
  try {
    const { mealType, foodName, calories, protein, carbs, fats, mealDate } = req.body;

    if (!mealType || !foodName || calories === undefined) {
      return res.status(400).json({ message: "Meal type, food name, and calories are required" });
    }

    const entry = await Nutrition.create({
      user: req.user._id,
      mealType,
      foodName: foodName.trim(),
      calories: Number(calories),
      protein: Number(protein || 0),
      carbs: Number(carbs || 0),
      fats: Number(fats || 0),
      mealDate: mealDate || new Date(),
    });

    emitNotification(req.app, req.user._id, {
      type: "meal",
      message: `Meal "${entry.foodName}" added successfully.`,
    });

    res.status(201).json({ message: "Nutrition entry added", entry });
  } catch (error) {
    res.status(500).json({ message: "Server error while adding nutrition entry" });
  }
};

const updateNutritionEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { mealType, foodName, calories, protein, carbs, fats, mealDate } = req.body;

    const entry = await Nutrition.findOne({ _id: id, user: req.user._id });
    if (!entry) {
      return res.status(404).json({ message: "Nutrition entry not found" });
    }

    entry.mealType = mealType || entry.mealType;
    entry.foodName = foodName ? foodName.trim() : entry.foodName;
    entry.calories = calories !== undefined ? Number(calories) : entry.calories;
    entry.protein = protein !== undefined ? Number(protein) : entry.protein;
    entry.carbs = carbs !== undefined ? Number(carbs) : entry.carbs;
    entry.fats = fats !== undefined ? Number(fats) : entry.fats;
    entry.mealDate = mealDate || entry.mealDate;

    await entry.save();

    emitNotification(req.app, req.user._id, {
      type: "meal",
      message: `Meal "${entry.foodName}" updated successfully.`,
    });

    res.json({ message: "Nutrition entry updated", entry });
  } catch (error) {
    res.status(500).json({ message: "Server error while updating nutrition entry" });
  }
};

const deleteNutritionEntry = async (req, res) => {
  try {
    const { id } = req.params;

    const entry = await Nutrition.findOneAndDelete({ _id: id, user: req.user._id });
    if (!entry) {
      return res.status(404).json({ message: "Nutrition entry not found" });
    }

    res.json({ message: "Nutrition entry deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error while deleting nutrition entry" });
  }
};

export {
  getNutritionEntries,
  createNutritionEntry,
  updateNutritionEntry,
  deleteNutritionEntry,
};
