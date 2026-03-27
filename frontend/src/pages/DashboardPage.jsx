import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const DashboardPage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="page">
      <div className="dashboard-card">
        <h1>Dashboard</h1>
        <p className="helper-text">
          Hello, <strong>{user?.fullName}</strong>
        </p>
        <p className="helper-text">Email: {user?.email}</p>
        <p className="helper-text">Goal: {user?.goal || "Maintain"}</p>
        <p className="helper-text">
          Notifications: {user?.notificationsEnabled ? "Enabled" : "Disabled"}
          {user?.notificationsEnabled && user?.reminderTime ? ` (${user.reminderTime})` : ""}
        </p>

        <div className="button-row">
          <Link className="link-button" to="/workouts">
            Open Workouts
          </Link>
          <Link className="link-button" to="/nutrition">
            Open Nutrition
          </Link>
          <Link className="link-button" to="/settings">
            Open Settings
          </Link>
          <Link className="link-button" to="/feedback">
            Support / Feedback
          </Link>
          <Link className="secondary-button" to="/login" onClick={logout}>
            Logout
          </Link>
        </div>

        <hr />

        <p className="helper-text">
          Week 4 started: Settings, Notifications toggle, Support/Feedback, and filters are now available.
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
