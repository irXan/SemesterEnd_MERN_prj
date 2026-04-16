import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Utensils } from "lucide-react";
import { getNutritionEntries, updateNutritionEntry } from "../services/nutritionService";
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
  Save,
  ArrowLeft
} from "lucide-react";

export default function EditNutritionPage() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    mealType: "",
    foodName: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
    mealDate: "",
  });

  useEffect(() => {
    const loadData = async () => {
      const res = await getNutritionEntries(token);
      if (res.ok) {
        const entry = res.data.entries.find((e) => e._id === id);
        if (entry) {
          setFormData({
            mealType: entry.mealType,
            foodName: entry.foodName,
            calories: String(entry.calories),
            protein: String(entry.protein || 0),
            carbs: String(entry.carbs || 0),
            fats: String(entry.fats || 0),
            mealDate: entry.mealDate ? entry.mealDate.slice(0, 10) : "",
          });
        } else {
          showError("Entry not found");
          navigate("/nutrition");
        }
      } else {
        showError(res.message);
      }
      setLoading(false);
    };

    loadData();
  }, [id, token, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      mealType: formData.mealType.trim(),
      foodName: formData.foodName.trim(),
      calories: Number(formData.calories),
      protein: Number(formData.protein || 0),
      carbs: Number(formData.carbs || 0),
      fats: Number(formData.fats || 0),
      mealDate: formData.mealDate || undefined,
    };

    const res = await updateNutritionEntry(token, id, payload);

    if (res.ok) {
      showSuccess("Entry Updated");
      navigate("/nutrition");
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
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center">
            <Activity className="text-black w-5 h-5" />
          </div>
          <h1 className="text-white font-black text-sm">Fitness Tracker</h1>
        </div>
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
        <div className="mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-white text-2xl font-black">
              Edit <span className="text-yellow-500">Nutrition</span>
            </h1>
            <button
              onClick={() => navigate("/nutrition")}
              className="flex items-center gap-2 w-100px px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          </div>
          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-[#111] border border-white/5 p-8 rounded-3xl space-y-6"
            >

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Meal Type</label>
                  <select name="mealType" value={formData.mealType} onChange={handleChange} className="input" required>
                    <option value="">Select Meal</option>
                    <option>Breakfast</option>
                    <option>Lunch</option>
                    <option>Dinner</option>
                    <option>Snack</option>
                  </select>
                </div>

                <div>
                  <label className="label">Food Name</label>
                  <input name="foodName" value={formData.foodName} onChange={handleChange} className="input" required />
                </div>
              </div>

              <div>
                <label className="label">Calories</label>
                <input name="calories" type="number" value={formData.calories} onChange={handleChange} className="input" required />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <input name="protein" type="number" value={formData.protein} onChange={handleChange} className="input" placeholder="Protein" />
                <input name="carbs" type="number" value={formData.carbs} onChange={handleChange} className="input" placeholder="Carbs" />
                <input name="fats" type="number" value={formData.fats} onChange={handleChange} className="input" placeholder="Fats" />
              </div>

              <div>
                <label className="label">Meal Date</label>
                <input name="mealDate" type="date" value={formData.mealDate} onChange={handleChange} className="input" />
              </div>

              <button className="w-full bg-yellow-500 text-black py-4 rounded-xl font-black flex items-center justify-center gap-2">
                <Save className="w-4 h-4" /> Update Entry
              </button>

            </form>
          )}
        </div>
      </main>

      <style>{`
        .input {
          width: 100%;
          background: #0a0a0a;
          border: 1px solid rgba(255,255,255,0.1);
        //   padding: 12px;
          border-radius: 12px;
          color: white;
        }
        .input:focus { outline: none; border-color: #eab308; }
        .label {
          font-size: 10px;
          font-weight: bold;
          color: #6b7280;
          margin-bottom: 6px;
          display: block;
          text-transform: uppercase;
        }
        .w-100px{
        max-width:100px;
        }
      `}</style>

    </div>
  );
}
