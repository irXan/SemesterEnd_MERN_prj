import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import { useAuth } from "../hooks/useAuth";
import {
  createNutritionEntry,
  deleteNutritionEntry,
  getNutritionEntries,
  updateNutritionEntry,
} from "../services/nutritionService";
import { showError, showSuccess } from "../utils/notify";

const defaultForm = {
  mealType: "",
  foodName: "",
  calories: "",
  protein: "",
  carbs: "",
  fats: "",
  mealDate: "",
};

const NutritionPage = () => {
  const { token } = useAuth();

  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState(defaultForm);
  const [editingId, setEditingId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [mealFilter, setMealFilter] = useState("All");
  const [minCalories, setMinCalories] = useState("");
  const [loading, setLoading] = useState(true);

  const loadEntries = useCallback(async () => {
    const response = await getNutritionEntries(token);

    if (response.ok) {
      setEntries(response.data.entries);
    } else {
      showError(response.message);
    }

    setLoading(false);
  }, [token]);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    loadEntries();
  }, [loadEntries]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const mealOptions = useMemo(() => {
    const unique = [...new Set(entries.map((e) => e.mealType))];
    return ["All", ...unique];
  }, [entries]);

  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
      const matchesSearch = `${entry.foodName} ${entry.mealType}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesMeal = mealFilter === "All" || entry.mealType === mealFilter;
      const matchesCalories =
        !minCalories || Number(entry.calories) >= Number(minCalories);

      return matchesSearch && matchesMeal && matchesCalories;
    });
  }, [entries, searchTerm, mealFilter, minCalories]);

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
      mealType: formData.mealType.trim(),
      foodName: formData.foodName.trim(),
      calories: Number(formData.calories),
      protein: Number(formData.protein || 0),
      carbs: Number(formData.carbs || 0),
      fats: Number(formData.fats || 0),
      mealDate: formData.mealDate || undefined,
    };

    let response;
    if (editingId) {
      response = await updateNutritionEntry(token, editingId, payload);
    } else {
      response = await createNutritionEntry(token, payload);
    }

    if (response.ok) {
      showSuccess(editingId ? "Nutrition entry updated" : "Nutrition entry added");
      resetForm();
      loadEntries();
    } else {
      showError(response.message);
    }
  };

  const startEdit = (entry) => {
    setEditingId(entry._id);
    setFormData({
      mealType: entry.mealType,
      foodName: entry.foodName,
      calories: String(entry.calories),
      protein: String(entry.protein ?? 0),
      carbs: String(entry.carbs ?? 0),
      fats: String(entry.fats ?? 0),
      mealDate: entry.mealDate ? entry.mealDate.slice(0, 10) : "",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this nutrition entry?");
    if (!confirmed) {
      return;
    }

    const response = await deleteNutritionEntry(token, id);
    if (response.ok) {
      showSuccess("Nutrition entry deleted");
      loadEntries();
    } else {
      showError(response.message);
    }
  };

  return (
    <div className="page">
      <div className="dashboard-card wide-card">
        <div className="top-row">
          <h1>Nutrition Tracker</h1>
          <Link className="link-button" to="/dashboard">
            Back to Dashboard
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="grid-form">
          <label htmlFor="mealType">Meal Type</label>
          <input
            id="mealType"
            name="mealType"
            type="text"
            value={formData.mealType}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="foodName">Food Name</label>
          <input
            id="foodName"
            name="foodName"
            type="text"
            value={formData.foodName}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="calories">Calories</label>
          <input
            id="calories"
            name="calories"
            type="number"
            min="0"
            value={formData.calories}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="protein">Protein (g)</label>
          <input
            id="protein"
            name="protein"
            type="number"
            min="0"
            value={formData.protein}
            onChange={handleInputChange}
          />

          <label htmlFor="carbs">Carbs (g)</label>
          <input
            id="carbs"
            name="carbs"
            type="number"
            min="0"
            value={formData.carbs}
            onChange={handleInputChange}
          />

          <label htmlFor="fats">Fats (g)</label>
          <input
            id="fats"
            name="fats"
            type="number"
            min="0"
            value={formData.fats}
            onChange={handleInputChange}
          />

          <label htmlFor="mealDate">Date</label>
          <input
            id="mealDate"
            name="mealDate"
            type="date"
            value={formData.mealDate}
            onChange={handleInputChange}
          />

          <div className="button-row">
            <button type="submit">{editingId ? "Update Entry" : "Add Entry"}</button>
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
            placeholder="Search by food or meal type..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />

          <select value={mealFilter} onChange={(event) => setMealFilter(event.target.value)}>
            {mealOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <input
            type="number"
            min="0"
            placeholder="Min calories"
            value={minCalories}
            onChange={(event) => setMinCalories(event.target.value)}
          />
        </div>

        {loading ? (
          <p className="helper-text">Loading nutrition entries...</p>
        ) : (
          <div className="list-wrap">
            {filteredEntries.length === 0 && (
              <EmptyState
                title="No nutrition entries found"
                subtitle="Try changing filters or add your first meal entry."
              />
            )}

            {filteredEntries.map((entry) => (
              <div key={entry._id} className="list-card">
                <p>
                  <strong>{entry.foodName}</strong> ({entry.mealType})
                </p>
                <p className="helper-text">
                  {entry.calories} kcal | P {entry.protein}g | C {entry.carbs}g | F {entry.fats}g
                </p>
                <p className="helper-text">
                  Date: {new Date(entry.mealDate).toLocaleDateString()}
                </p>
                <div className="inline-buttons">
                  <button type="button" onClick={() => startEdit(entry)}>
                    Edit
                  </button>
                  <button type="button" className="danger-button" onClick={() => handleDelete(entry._id)}>
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

export default NutritionPage;
