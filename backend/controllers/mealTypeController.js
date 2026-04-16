import MealType from "../models/MealType.js";

export const getMealTypes = async (req, res) => {
  const data = await MealType.find({ user: req.user._id });
  res.json({ data });
};

export const createMealType = async (req, res) => {
  const { name } = req.body;

  const item = await MealType.create({
    name,
    user: req.user._id,
  });

  res.json({ item });
};

export const updateMealType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    console.log(req.body);
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const mealType = await MealType.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!mealType) {
      return res.status(404).json({ message: "Meal type not found" });
    }

    mealType.name = name.trim();

    const mealtypes = await mealType.save();
    console.log("updated", mealtypes);
    res.json({ message: "Meal type updated", mealType });
  } catch (error) {
    res.status(500).json({ message: "Server error while updating meal type" });
  }
};

export const deleteMealType = async (req, res) => {
  await MealType.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  res.json({ message: "Deleted" });
};