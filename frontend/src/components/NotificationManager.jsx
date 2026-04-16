import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { showSuccess } from "../utils/notify";

const NotificationManager = () => {
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || !user?.notificationsEnabled || !user?.reminderTime) {
      return;
    }

    const checkReminder = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      const currentTime = `${hh}:${mm}`;

      if (currentTime !== user.reminderTime) {
        return;
      }

      const today = now.toISOString().slice(0, 10);
      const storageKey = `fitness_reminder_last_${user.id}`;
      const lastShownDate = localStorage.getItem(storageKey);

      if (lastShownDate === today) {
        return;
      }

      localStorage.setItem(storageKey, today);

      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Fitness Reminder", {
          body: "Time for your fitness check-in. Log workout or nutrition now.",
        });
      }

      showSuccess("Fitness reminder: time to log your activity.");
    };

    const timer = setInterval(checkReminder, 60000);
    checkReminder();

    return () => clearInterval(timer);
  }, [isAuthenticated, user]);

  return null;
};

export default NotificationManager;
