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

        <div className="button-row">
          <Link className="link-button" to="/workouts">
            Open Workouts
          </Link>
          <Link className="link-button" to="/nutrition">
            Open Nutrition
          </Link>
          <Link className="secondary-button" to="/login" onClick={logout}>
            Logout
          </Link>
        </div>

        <hr />

        <p className="helper-text">
          Week 1 auth milestone is complete. Next step is to build workout and nutrition modules.
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
