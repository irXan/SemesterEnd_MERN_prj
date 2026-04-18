import Workout from "../models/Workout.js";
import Nutrition from "../models/Nutrition.js";

export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 6);
    last7Days.setHours(0, 0, 0, 0);

    const todayNutrition = await Nutrition.find({
      user: userId,
      mealDate: { $gte: todayStart, $lte: todayEnd },
    });

    const todayCalories = todayNutrition.reduce((sum, n) => sum + n.calories, 0);
    const todayProtein = todayNutrition.reduce((sum, n) => sum + n.protein, 0);
    const todayCarbs = todayNutrition.reduce((sum, n) => sum + n.carbs, 0);
    const todayFats = todayNutrition.reduce((sum, n) => sum + n.fats, 0);

    const todayWorkouts = await Workout.find({
      user: userId,
      workoutDate: { $gte: todayStart, $lte: todayEnd },
    }).populate("exercise", "name");

    const weeklyWorkouts = await Workout.find({
      user: userId,
      workoutDate: { $gte: last7Days },
    });

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weeklyActivity = days.map((day, index) => {
      const count = weeklyWorkouts.filter((w) => {
        return new Date(w.workoutDate).getDay() === index;
      }).length;
      return { day, count };
    });

    const recentMeals = await Nutrition.find({ user: userId })
      .populate("mealType", "name")
      .sort({ mealDate: -1, createdAt: -1 })
      .limit(5);

    const recentWorkouts = await Workout.find({ user: userId })
      .populate("exercise", "name")
      .sort({ workoutDate: -1, createdAt: -1 })
      .limit(5);

    res.json({
      stats: {
        todayCalories,
        todayProtein,
        todayCarbs,
        todayFats,
        todayWorkoutCount: todayWorkouts.length,
        totalMealsToday: todayNutrition.length,
      },
      weeklyActivity,
      recentMeals,
      recentWorkouts,
    });
  } catch (error) {
    res.status(500).json({ message: "Error loading dashboard" });
  }
};