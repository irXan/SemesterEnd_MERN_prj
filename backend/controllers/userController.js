import emitNotification from "../utils/emitNotification.js";

const getCurrentUser = async (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      fullName: req.user.fullName,
      email: req.user.email,
      heightCm: req.user.heightCm,
      goal: req.user.goal,
      notificationsEnabled: req.user.notificationsEnabled,
      reminderTime: req.user.reminderTime,
    },
  });
};

const updateUserSettings = async (req, res) => {
  try {
    const { fullName, email, heightCm, goal, notificationsEnabled, reminderTime } = req.body;

    if (email !== undefined) {
      req.user.email = email.trim(); 
    }

    if (fullName !== undefined) {
      req.user.fullName = fullName.trim();
    }

    if (heightCm !== undefined) {
      req.user.heightCm = Number(heightCm);
    }

    if (goal !== undefined) {
      req.user.goal = goal.trim();
    }

    if (notificationsEnabled !== undefined) {
      req.user.notificationsEnabled = Boolean(notificationsEnabled);
    }

    if (reminderTime !== undefined) {
      req.user.reminderTime = reminderTime;
    }

    await req.user.save();

    emitNotification(req.app, req.user._id, {
      type: "settings",
      message: "Profile settings updated successfully.",
    });

    res.json({
      message: "Settings updated",
      user: {
        id: req.user._id,
        fullName: req.user.fullName,
        email: req.user.email,
        heightCm: req.user.heightCm,
        goal: req.user.goal,
        notificationsEnabled: req.user.notificationsEnabled,
        reminderTime: req.user.reminderTime,
      },
    });
  } catch {
    res.status(500).json({ message: "Server error while updating settings" });
  }
};

export { getCurrentUser, updateUserSettings };
