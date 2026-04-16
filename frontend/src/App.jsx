import { Navigate, Route, Routes } from "react-router-dom";
import NotificationManager from "./components/NotificationManager";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import FeedbackPage from "./pages/FeedbackPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NutritionPage from "./pages/NutritionPage.jsx";
import AddNutritionPage from "./pages/AddNutritionPage.jsx";
import EditNutritionPage from "./pages/EditNutritionPage.jsx";
import MealsPage from "./pages/MealsPage.jsx";
import ExercisesPage from "./pages/ExercisesPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import WorkoutsPage from "./pages/WorkoutsPage.jsx";
import Home from "./pages/Home.jsx"
import "./App.css";
import AboutUs from "./pages/Aboutus.jsx";
import Loader from "./components/Loader";
import { useState } from "react";

function App() {
    const [loading, setLoading] = useState(true);
  return (
    <>
    {loading && <Loader onComplete={() => setLoading(false)} />}
      <NotificationManager />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/aboutus" element={<AboutUs/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/nutrition/add" element={<AddNutritionPage />} />
        <Route path="/nutrition/edit/:id" element={<EditNutritionPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/workouts"
          element={
            <ProtectedRoute>
              <WorkoutsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/meals"
          element={
            <ProtectedRoute>
              <MealsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/exercises"
          element={
            <ProtectedRoute>
              <ExercisesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/nutrition"
          element={
            <ProtectedRoute>
              <NutritionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/feedback"
          element={
            <ProtectedRoute>
              <FeedbackPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App
