import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import { useAuth } from "../hooks/useAuth";
import {
  createWorkout,
  deleteWorkout,
  getWorkouts,
  updateWorkout,
} from "../services/workoutService";
import { showError, showSuccess } from "../utils/notify";
import {
  LayoutDashboard,
  Dumbbell,
  Apple,
  Target,
  Calculator,
  MessageSquare,
  Settings,
  LogOut,
  Flame,
  Calendar,
  Search,
  Filter,
  Plus,
  Pencil,
  Trash2,
  ChevronRight,
  Activity,
  User,
  RotateCcw,
  X
} from "lucide-react";

const defaultForm = {
  exercise: "",
  sets: "",
  reps: "",
  weight: "",
  workoutDate: "",
};

const WorkoutsPage = () => {
  const { token, user, logout } = useAuth();
  const location = useLocation();

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

  const sidebarItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/workouts", label: "Workouts", icon: Dumbbell },
    { to: "/nutrition", label: "Nutrition", icon: Apple },
    { to: "/goals", label: "Goals", icon: Target },
    { to: "/bmi", label: "BMI Calculator", icon: Calculator },
    { to: "/feedback", label: "Support", icon: MessageSquare },
    { to: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sans tracking-tight flex">
      
      {/* --- Sidebar --- */}
      <aside className="w-64 bg-[#111] border-r border-white/5 flex flex-col fixed h-full z-50">
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
              <Activity className="w-5 h-5 text-black" />
            </div>
            <div>
              <h1 className="text-sm font-black text-white uppercase tracking-tighter">Fitness Tracker</h1>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Health Analytics</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="text-[10px] font-black text-gray-600 uppercase tracking-wider mb-3 px-3">Main</p>
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  isActive 
                    ? "bg-yellow-500 text-black" 
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center border border-white/10">
              <User className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black text-white truncate">{user?.fullName || "User"}</p>
              <p className="text-[10px] text-gray-500 truncate">{user?.email}</p>
            </div>
            <button 
              onClick={logout}
              className="p-2 hover:bg-red-500/20 rounded-lg transition-colors group"
            >
              <LogOut className="w-4 h-4 text-gray-500 group-hover:text-red-500" />
            </button>
          </div>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <main className="flex-1 ml-64 p-8">
        
        {/* --- Header --- */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-500/20 rounded-xl border border-yellow-500/30">
              <Dumbbell className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white uppercase tracking-tighter">
                Workout <span className="text-yellow-500">Tracker</span>
              </h1>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mt-1">
                Log and track your exercises
              </p>
            </div>
          </div>
          <Link 
            to="/dashboard"
            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-black uppercase tracking-wider text-gray-400 hover:bg-white/10 hover:text-white transition-all duration-300"
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* --- Left Column: Form (BILKUL SAME RAKHA HAI) --- */}
          <div className="xl:col-span-1">
            <div className="bg-[#111] border border-white/5 p-6 rounded-3xl sticky top-8">
              <h2 className="text-lg font-black text-white mb-6 uppercase tracking-wider flex items-center gap-3">
                <Plus className="w-5 h-5 text-yellow-500" />
                {editingId ? "Edit Workout" : "Add Workout"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">
                    Exercise
                  </label>
                  <input
                    id="exercise"
                    name="exercise"
                    type="text"
                    placeholder="e.g. Bench Press"
                    value={formData.exercise}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-all text-white placeholder:text-gray-700 text-sm font-bold uppercase"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">
                      Sets
                    </label>
                    <input
                      id="sets"
                      name="sets"
                      type="number"
                      min="1"
                      placeholder="3"
                      value={formData.sets}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-all text-white placeholder:text-gray-700 text-sm font-bold uppercase"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">
                      Reps
                    </label>
                    <input
                      id="reps"
                      name="reps"
                      type="number"
                      min="1"
                      placeholder="10"
                      value={formData.reps}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-all text-white placeholder:text-gray-700 text-sm font-bold uppercase"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">
                    Weight (kg)
                  </label>
                  <input
                    id="weight"
                    name="weight"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-all text-white placeholder:text-gray-700 text-sm font-bold uppercase"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">
                    Date
                  </label>
                  <input
                    id="workoutDate"
                    name="workoutDate"
                    type="date"
                    value={formData.workoutDate}
                    onChange={handleInputChange}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-all text-white text-sm font-bold uppercase [color-scheme:dark]"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button 
                    type="submit"
                    className="flex-1 py-4 bg-yellow-500 text-black font-black uppercase tracking-[0.2em] rounded-xl hover:bg-white transition-all duration-500 transform active:scale-95 shadow-xl flex items-center justify-center gap-2"
                  >
                    {editingId ? <Pencil className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    {editingId ? "Update" : "Add"}
                  </button>
                  
                  {editingId && (
                    <button 
                      type="button" 
                      onClick={resetForm}
                      className="px-4 py-4 bg-red-500/20 border border-red-500/30 text-red-500 rounded-xl hover:bg-red-500/30 transition-all duration-300"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* --- Right Column: List & Filters --- */}
          <div className="xl:col-span-2 space-y-6">
            
            {/* Filters */}
            <div className="bg-[#111] border border-white/5 p-6 rounded-3xl">
              <h3 className="text-sm font-black text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                <Filter className="w-4 h-4 text-yellow-500" />
                Filters
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search exercise..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-yellow-500 transition-all text-white placeholder:text-gray-700 text-sm font-bold uppercase"
                  />
                </div>

                <select 
                  value={exerciseFilter} 
                  onChange={(event) => setExerciseFilter(event.target.value)}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-all text-white text-sm font-bold uppercase appearance-none cursor-pointer"
                >
                  {exerciseOptions.map((option) => (
                    <option key={option} value={option} className="bg-[#111]">
                      {option}
                    </option>
                  ))}
                </select>

                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input 
                    type="date" 
                    value={dateFilter} 
                    onChange={(event) => setDateFilter(event.target.value)}
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-yellow-500 transition-all text-white text-sm font-bold uppercase [color-scheme:dark]"
                  />
                </div>
              </div>
              
              {(searchTerm || exerciseFilter !== "All" || dateFilter) && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setExerciseFilter("All");
                    setDateFilter("");
                  }}
                  className="mt-4 flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-wider hover:text-yellow-500 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset Filters
                </button>
              )}
            </div>

            {/* Workouts List */}
            <div className="bg-[#111] border border-white/5 p-6 rounded-3xl min-h-[500px]">
              <h3 className="text-sm font-black text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                <Flame className="w-4 h-4 text-yellow-500" />
                Your Workouts ({filteredWorkouts.length})
              </h3>

              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="animate-pulse flex items-center gap-3 text-yellow-500 font-black uppercase text-xs tracking-widest">
                    <Activity className="w-5 h-5 animate-spin" />
                    Loading Workouts...
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredWorkouts.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="w-20 h-20 mx-auto mb-6 bg-white/5 rounded-full flex items-center justify-center">
                        <Dumbbell className="w-10 h-10 text-gray-600" />
                      </div>
                      <h4 className="text-lg font-black text-white uppercase tracking-wider mb-2">No workouts found</h4>
                      <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Try changing filters or add your first workout</p>
                    </div>
                  ) : (
                    filteredWorkouts.map((workout) => (
                      <div 
                        key={workout._id} 
                        className="group bg-[#0a0a0a] border border-white/5 rounded-2xl p-5 hover:border-yellow-500/30 transition-all duration-500"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center border border-yellow-500/20">
                              <Dumbbell className="w-6 h-6 text-yellow-500" />
                            </div>
                            <div>
                              <h4 className="text-sm font-black text-white uppercase tracking-tight group-hover:text-yellow-500 transition-colors duration-300">
                                {workout.exercise}
                              </h4>
                              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">
                                {workout.sets} sets × {workout.reps} reps • {workout.weight} kg
                              </p>
                              <p className="text-[10px] text-gray-600 font-bold uppercase tracking-wider mt-1 flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(workout.workoutDate).toLocaleDateString('en-US', { 
                                  weekday: 'short', 
                                  year: 'numeric', 
                                  month: 'short', 
                                  day: 'numeric' 
                                })}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button 
                              type="button" 
                              onClick={() => startEdit(workout)}
                              className="p-3 bg-blue-500/20 border border-blue-500/30 rounded-xl text-blue-500 hover:bg-blue-500/30 transition-all duration-300"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button 
                              type="button" 
                              onClick={() => handleDelete(workout._id)}
                              className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-500 hover:bg-red-500/30 transition-all duration-300"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default WorkoutsPage;