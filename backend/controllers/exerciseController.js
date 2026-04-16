import Exercise from "../models/Exercise.js";
import emitNotification from "../utils/emitNotification.js";

export const getExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ exercises });
  } catch {
    res.status(500).json({ message: "Error loading exercises" });
  }
};

export const createExercise = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: "Name required" });

    const exercise = await Exercise.create({
      user: req.user._id,
      name: name.trim(),
    });

    emitNotification(req.app, req.user._id, {
      type: "exercise",
      message: `Exercise "${exercise.name}" added successfully.`,
    });

    res.status(201).json({ exercise });
  } catch {
    res.status(500).json({ message: "Error creating exercise" });
  }
};

export const updateExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const exercise = await Exercise.findOne({ _id: id, user: req.user._id });

    if (!exercise) return res.status(404).json({ message: "Not found" });

    exercise.name = name || exercise.name;

    await exercise.save();

    emitNotification(req.app, req.user._id, {
      type: "exercise",
      message: `Exercise "${exercise.name}" updated successfully.`,
    });

    res.json({ exercise });
  } catch {
    res.status(500).json({ message: "Error updating exercise" });
  }
};

export const deleteExercise = async (req, res) => {
  try {
    const { id } = req.params;

    const exercise = await Exercise.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!exercise) return res.status(404).json({ message: "Not found" });

    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ message: "Error deleting exercise" });
  }
};
