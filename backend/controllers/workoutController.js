import Workout from "../models/Workout.js";
import emitNotification from "../utils/emitNotification.js";

const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user._id })
      .populate("exercise", "name")
      .sort({
        workoutDate: -1,
        createdAt: -1,
      });

    res.json({ workouts });
  } catch (error) {
    res.status(500).json({ message: "Server error while loading workouts" });
  }
};

const createWorkout = async (req, res) => {
  try {
    const { exercise, sets, reps, weight, workoutDate } = req.body;

    if (!exercise || !sets || !reps) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const workout = await Workout.create({
      user: req.user._id,
      exercise,
      sets: Number(sets),
      reps: Number(reps),
      weight: Number(weight || 0),
      workoutDate: workoutDate || new Date(),
    });

    emitNotification(req.app, req.user._id, {
      type: "workout",
      message: "Workout added successfully.",
    });
    
    res.status(201).json({ message: "Workout added", workout });
  } catch (error) {
    res.status(500).json({ message: "Server error while adding workout" });
  }
};

const updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const { exercise, sets, reps, weight, workoutDate } = req.body;

    const workout = await Workout.findOne({ _id: id, user: req.user._id });
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    workout.exercise = exercise || workout.exercise;
    workout.sets = sets ? Number(sets) : workout.sets;
    workout.reps = reps ? Number(reps) : workout.reps;
    workout.weight = weight !== undefined ? Number(weight) : workout.weight;
    workout.workoutDate = workoutDate || workout.workoutDate;

    await workout.save();

    emitNotification(req.app, req.user._id, {
      type: "workout",
      message: "Workout updated successfully.",
    });

    res.json({ message: "Workout updated", workout });
  } catch (error) {
    res.status(500).json({ message: "Server error while updating workout" });
  }
};

const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    const workout = await Workout.findOneAndDelete({ _id: id, user: req.user._id });
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.json({ message: "Workout deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error while deleting workout" });
  }
};

export {
  getWorkouts,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
