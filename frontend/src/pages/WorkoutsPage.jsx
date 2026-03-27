import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import { useAuth } from "../hooks/useAuth";
import {
  createWorkout,
  deleteWorkout,
  getWorkouts,
  updateWorkout,
} from "../services/workoutService";
import { showError, showSuccess } from "../utils/notify";

const defaultForm = {
  exercise: "",
  sets: "",
  reps: "",
  weight: "",
  workoutDate: "",
};

const WorkoutsPage = () => {
  const { token } = useAuth();

  const [workouts, setWorkouts] = useState([]);
  const [formData, setFormData] = useState(defaultForm);
  const [editingId, setEditingId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [exerciseFilter, setExerciseFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const loadWorkouts = useCallback(async () => {
    const response = await getWorkouts(token);

    if (response.ok) {
      setWorkouts(response.data.workouts);
    } else {
      showError(response.message);
    }

    setLoading(false);
  }, [token]);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    loadWorkouts();
  }, [loadWorkouts]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const exerciseOptions = useMemo(() => {
    const unique = [...new Set(workouts.map((w) => w.exercise))];
    return ["All", ...unique];
  }, [workouts]);

  const filteredWorkouts = useMemo(() => {
    return workouts.filter((workout) => {
      const matchesSearch = workout.exercise.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesExercise = exerciseFilter === "All" || workout.exercise === exerciseFilter;

      let matchesDate = true;
      if (dateFilter) {
        const workoutDate = new Date(workout.workoutDate).toISOString().slice(0, 10);
        matchesDate = workoutDate === dateFilter;
      }

      return matchesSearch && matchesExercise && matchesDate;
    });
  }, [workouts, searchTerm, exerciseFilter, dateFilter]);

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const resetForm = () => {
    setFormData(defaultForm);
    setEditingId("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      exercise: formData.exercise.trim(),
      sets: Number(formData.sets),
      reps: Number(formData.reps),
      weight: Number(formData.weight || 0),
      workoutDate: formData.workoutDate || undefined,
    };

    let response;
    if (editingId) {
      response = await updateWorkout(token, editingId, payload);
    } else {
      response = await createWorkout(token, payload);
    }

    if (response.ok) {
      showSuccess(editingId ? "Workout updated" : "Workout added");
      resetForm();
      loadWorkouts();
    } else {
      showError(response.message);
    }
  };

  const startEdit = (workout) => {
    setEditingId(workout._id);
    setFormData({
      exercise: workout.exercise,
      sets: String(workout.sets),
      reps: String(workout.reps),
      weight: String(workout.weight ?? 0),
      workoutDate: workout.workoutDate ? workout.workoutDate.slice(0, 10) : "",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this workout?");
    if (!confirmed) {
      return;
    }

    const response = await deleteWorkout(token, id);
    if (response.ok) {
      showSuccess("Workout deleted");
      loadWorkouts();
    } else {
      showError(response.message);
    }
  };

  return (
    <div className="page">
      <div className="dashboard-card wide-card">
        <div className="top-row">
          <h1>Workout Tracker</h1>
          <Link className="link-button" to="/dashboard">
            Back to Dashboard
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="grid-form">
          <label htmlFor="exercise">Exercise</label>
          <input
            id="exercise"
            name="exercise"
            type="text"
            value={formData.exercise}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="sets">Sets</label>
          <input
            id="sets"
            name="sets"
            type="number"
            min="1"
            value={formData.sets}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="reps">Reps</label>
          <input
            id="reps"
            name="reps"
            type="number"
            min="1"
            value={formData.reps}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="weight">Weight (kg)</label>
          <input
            id="weight"
            name="weight"
            type="number"
            min="0"
            value={formData.weight}
            onChange={handleInputChange}
          />

          <label htmlFor="workoutDate">Date</label>
          <input
            id="workoutDate"
            name="workoutDate"
            type="date"
            value={formData.workoutDate}
            onChange={handleInputChange}
          />

          <div className="button-row">
            <button type="submit">{editingId ? "Update Workout" : "Add Workout"}</button>
            {editingId && (
              <button type="button" className="secondary-button" onClick={resetForm}>
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        <div className="filters-grid">
          <input
            type="text"
            placeholder="Search by exercise..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />

          <select value={exerciseFilter} onChange={(event) => setExerciseFilter(event.target.value)}>
            {exerciseOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <input type="date" value={dateFilter} onChange={(event) => setDateFilter(event.target.value)} />
        </div>

        {loading ? (
          <p className="helper-text">Loading workouts...</p>
        ) : (
          <div className="list-wrap">
            {filteredWorkouts.length === 0 && (
              <EmptyState
                title="No workouts found"
                subtitle="Try changing filters or add your first workout."
              />
            )}

            {filteredWorkouts.map((workout) => (
              <div key={workout._id} className="list-card">
                <p>
                  <strong>{workout.exercise}</strong>
                </p>
                <p className="helper-text">
                  {workout.sets} sets x {workout.reps} reps, {workout.weight} kg
                </p>
                <p className="helper-text">
                  Date: {new Date(workout.workoutDate).toLocaleDateString()}
                </p>
                <div className="inline-buttons">
                  <button type="button" onClick={() => startEdit(workout)}>
                    Edit
                  </button>
                  <button type="button" className="danger-button" onClick={() => handleDelete(workout._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutsPage;
