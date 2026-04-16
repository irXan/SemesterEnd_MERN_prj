import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getExercises } from "../services/exerciseService";
import { Utensils } from "lucide-react";
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
  Activity,
  User,
  Plus,
  Trash2,
  Pencil,
  Search,
} from "lucide-react";

export default function WorkoutsPage() {
  const { token, user, logout } = useAuth();
  const [exercises, setExercises] = useState([]);

  const loadExercises = useCallback(async () => {
  const res = await getExercises(token);
    if (res.ok) {
      setExercises(res.data.exercises);
    } else {
      showError(res.message);
    }
  }, [token]);

  const loadWorkouts = useCallback(async () => {
    const res = await getWorkouts(token);
    if (res.ok) {
      setWorkouts(res.data.workouts);
    } else {
      showError(res.message);
    }
    setLoading(false);
  }, [token]);

  useEffect(() => {
    loadWorkouts();
    loadExercises();
  }, [loadWorkouts, loadExercises]);
 
  const location = useLocation();

  const [workouts, setWorkouts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState(null);

  const [formData, setFormData] = useState({
    exercise: "",
    sets: "",
    reps: "",
    weight: "",
    workoutDate: "",
  });

  
  const filteredWorkouts = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return workouts.filter((w) =>
      w.exercise?.name?.toLowerCase().includes(term)
    );
  }, [workouts, searchTerm]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this workout?")) return;

    const res = await deleteWorkout(token, id);
    if (res.ok) {
      showSuccess("Deleted");
      loadWorkouts();
    } else {
      showError(res.message);
    }
  };

  const openAddModal = () => {
    setEditingWorkout(null);
    setFormData({
      exercise: "",
      sets: "",
      reps: "",
      weight: "",
      workoutDate: "",
    });
    setShowModal(true);
  };

  const openEditModal = (w) => {
    setEditingWorkout(w);
    setFormData({
      exercise: w.exercise?._id,
      sets: w.sets,
      reps: w.reps,
      weight: w.weight,
      workoutDate: w.workoutDate?.slice(0, 10),
    });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!formData.exercise) return showError("Exercise required");

    let res;
    if (editingWorkout) {
      res = await updateWorkout(token, editingWorkout._id, formData);
    } else {
      res = await createWorkout(token, formData);
    }

    if (res.ok) {
      showSuccess(editingWorkout ? "Updated" : "Created");
      setShowModal(false);
      loadWorkouts();
    } else {
      showError(res.message);
    }
  };

  const sidebarItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/workouts", label: "Workouts", icon: Dumbbell },
    { to: "/exercises", label: "Exercises", icon: Activity }, 
    { to: "/nutrition", label: "Nutrition", icon: Apple },
    { to: "/meals", label: "Meals", icon: Utensils }, 
    { to: "/feedback", label: "Support", icon: MessageSquare },
    { to: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      
      <aside className="w-64 bg-[#111] border-r border-white/5 flex flex-col fixed h-full">
       <Link to="/"  className="p-6 border-b border-white/5 block hover:bg-white/[0.02] transition-colors group">
             <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center group-hover:scale-105 transition-transform">
               <Activity className="w-5 h-5 text-black" />
             </div>
             <div>
               <h1 className="text-sm font-black text-white uppercase tracking-tighter group-hover:text-yellow-500 transition-colors">
                 Fitness Tracker
               </h1>
               <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                 Health Analytics
               </p>
             </div>
           </div>
         </Link>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl text-xs font-bold uppercase ${
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

        <div className="p-4 border-t border-white/5 flex items-center gap-3">
          <User className="text-gray-400" />
          <div>
            <p className="text-white text-xs">{user?.fullName}</p>
            <p className="text-gray-500 text-[10px]">{user?.email}</p>
          </div>
          <button onClick={logout}>
            <LogOut className="text-gray-400 hover:text-red-500" />
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8">
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-white text-2xl font-black">
            Workouts <span className="text-yellow-500">Manager</span>
          </h1>

          <button
            onClick={openAddModal}
            className="flex items-center w-[170px] gap-2 bg-yellow-500 text-black px-5 py-3 rounded-xl font-bold"
          >
            <Plus className="w-4 h-4" /> Add Workout
          </button>
        </div>

        <div className="mb-6 relative">
          <Search className="absolute left-3 top-3 text-gray-500" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search workouts..."
            className="w-full bg-[#111] border border-white/10 pl-10 pr-4 py-3 rounded-xl text-white"
          />
        </div>

        <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden">
          <table className="w-full text-sm text-left text-gray-400">
            <thead className="bg-[#0a0a0a] text-gray-500 uppercase text-xs">
              <tr>
                <th className="p-4">Exercise</th>
                <th>Sets</th>
                <th>Reps</th>
                <th>Weight</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-6 text-center">Loading...</td>
                </tr>
              ) : filteredWorkouts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-6 text-center">No workouts</td>
                </tr>
              ) : (
                filteredWorkouts.map((w) => (
                  <tr key={w._id} className="border-t border-white/5">
                    <td className="p-4 text-white font-bold">{w.exercise?.name}</td>
                    <td>{w.sets}</td>
                    <td>{w.reps}</td>
                    <td>{w.weight}</td>
                    <td>
  {w.workoutDate
    ? new Date(w.workoutDate).toLocaleDateString()
    : "N/A"}
</td>
                    <td className="flex gap-2 p-3">
                      <Pencil
                        className="w-4 h-4 text-blue-400 cursor-pointer"
                        onClick={() => openEditModal(w)}
                      />
                      <Trash2
                        className="w-4 h-4 text-red-400 cursor-pointer"
                        onClick={() => handleDelete(w._id)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center">
          <div className="bg-[#111] p-6 rounded-xl w-96 space-y-3">
            <h2 className="text-lg font-bold">
              {editingWorkout ? "Edit Workout" : "Add Workout"}
            </h2>

            
            <select
              value={formData.exercise}
              onChange={(e) =>
                setFormData({ ...formData, exercise: e.target.value })
              }
              className="w-full p-3 bg-black border border-white/10 rounded"
            >
              <option value="">Select Exercise</option>
              {exercises.map((ex) => (
                <option key={ex._id} value={ex._id}>
                  {ex.name}
                </option>
              ))}
            </select>
            <input placeholder="Sets" type="number"
              value={formData.sets}
              onChange={(e)=>setFormData({...formData,sets:e.target.value})}
              className="w-full p-3 bg-black border border-white/10 rounded" />

            <input placeholder="Reps" type="number"
              value={formData.reps}
              onChange={(e)=>setFormData({...formData,reps:e.target.value})}
              className="w-full p-3 bg-black border border-white/10 rounded" />

            <input placeholder="Weight" type="number"
              value={formData.weight}
              onChange={(e)=>setFormData({...formData,weight:e.target.value})}
              className="w-full p-3 bg-black border border-white/10 rounded" />

            <input type="date"
              value={formData.workoutDate}
              onChange={(e)=>setFormData({...formData,workoutDate:e.target.value})}
              className="w-full p-3 bg-black border border-white/10 rounded" />

            <div className="flex justify-end gap-2">
              <button onClick={()=>setShowModal(false)}>Cancel</button>
              <button onClick={handleSubmit}
                className="bg-yellow-500 text-black px-4 py-2 rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}