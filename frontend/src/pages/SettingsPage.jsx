import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { updateUserSettings } from "../services/authService";
import { showError, showSuccess } from "../utils/notify";

const goalOptions = ["Lose Weight", "Maintain", "Gain Muscle", "Improve Stamina"];

const SettingsPage = () => {
  const { user, token, setUser } = useAuth();

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    heightCm: user?.heightCm || 0,
    goal: user?.goal || "Maintain",
    notificationsEnabled: user?.notificationsEnabled ?? true,
    reminderTime: user?.reminderTime || "08:00",
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await updateUserSettings(token, {
      ...formData,
      heightCm: Number(formData.heightCm || 0),
    });

    if (response.ok) {
      setUser(response.data.user);

      if (formData.notificationsEnabled && "Notification" in window) {
        if (Notification.permission === "default") {
          const permission = await Notification.requestPermission();
          if (permission !== "granted") {
            showError("Notification permission blocked. Browser alerts will not appear.");
            showSuccess("Settings saved. In-app reminder toast will still work while app is open.");
            return;
          }
        }
      }

      showSuccess("Settings saved successfully");
    } else {
      showError(response.message);
    }
  };

  return (
    <div className="page">
      <div className="dashboard-card wide-card">
        <div className="top-row">
          <h1>Settings</h1>
          <Link className="link-button" to="/dashboard">
            Back to Dashboard
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="grid-form">
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <label htmlFor="heightCm">Height (cm)</label>
          <input
            id="heightCm"
            name="heightCm"
            type="number"
            min="0"
            value={formData.heightCm}
            onChange={handleChange}
          />

          <label htmlFor="goal">Goal</label>
          <select id="goal" name="goal" value={formData.goal} onChange={handleChange}>
            {goalOptions.map((goal) => (
              <option key={goal} value={goal}>
                {goal}
              </option>
            ))}
          </select>

          <div className="toggle-row">
            <label htmlFor="notificationsEnabled">Enable Notifications</label>
            <input
              id="notificationsEnabled"
              name="notificationsEnabled"
              type="checkbox"
              checked={formData.notificationsEnabled}
              onChange={handleChange}
            />
          </div>

          <label htmlFor="reminderTime">Reminder Time</label>
          <input
            id="reminderTime"
            name="reminderTime"
            type="time"
            value={formData.reminderTime}
            onChange={handleChange}
            disabled={!formData.notificationsEnabled}
          />

          <button type="submit">Save Settings</button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
