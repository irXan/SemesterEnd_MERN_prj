import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Utensils } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { updateUserSettings } from "../services/authService";
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
  User,
  Activity,
  Save
} from "lucide-react";

const goalOptions = [
  "Lose Weight",
  "Maintain",
  "Gain Muscle",
  "Improve Stamina",
];

export default function SettingsPage() {
  const { user, token, setUser, logout } = useAuth();
  const location = useLocation();

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",   
    heightCm: user?.heightCm || "",
    goal: user?.goal || "Maintain",
    notificationsEnabled: user?.notificationsEnabled ?? true,
    reminderTime: user?.reminderTime || "08:00",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await updateUserSettings(token, {
      ...formData,
      heightCm: Number(formData.heightCm || 0),
    });

    if (response.ok) {
      setUser(response.data.user);
      showSuccess("Settings saved successfully");
    } else {
      showError(response.message);
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

      <aside className="w-64 bg-[#111] border-r border-white/5 flex flex-col fixed h-full z-50">
       <Link to="/" className="p-6 border-b border-white/5 block hover:bg-white/[0.02] transition-colors group" >
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center group-hover:scale-105 transition-transform">
               <Activity className="w-5 h-5 text-black" />
             </div>
             <div>
               <h1 className="text-sm font-black text-white uppercase tracking-tighter group-hover:text-yellow-500 transition-colors">
                 Fitness Tracker
               </h1>
               <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                 Settings Panel
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
                className={`flex items-center gap-3 px-3 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
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

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
            <div className="w-10 h-10 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-black text-white">{user?.fullName}</p>
              <p className="text-[10px] text-gray-500">{user?.email}</p>
            </div>
            <button onClick={logout}>
              <LogOut className="h-4 text-red-500" />
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8">
        <div className="mx-auto">

          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-yellow-500/20 rounded-xl">
              <Settings className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white uppercase">
                Profile <span className="text-yellow-500">Settings</span>
              </h1>
              <p className="text-gray-500 text-xs uppercase">Manage your account</p>
            </div>
          </div>

          <div className="bg-[#111] border border-white/5 p-6 rounded-3xl">
            <form onSubmit={handleSubmit} className="space-y-5">

              <input
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full bg-black border border-white/10 px-4 py-3 rounded-xl text-white"
              />

              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-black border border-white/10 px-4 py-3 rounded-xl text-white"
              />

              <input
                name="heightCm"
                type="number"
                placeholder="Height"
                value={formData.heightCm}
                onChange={handleChange}
                className="w-full bg-black border border-white/10 px-4 py-3 rounded-xl text-white"
              />

              <select
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                className="w-full bg-black border border-white/10 px-4 py-3 rounded-xl text-white"
              >
                {goalOptions.map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </select>

              <div className="flex justify-between items-center">
                <span className="text-white text-sm">Notifications</span>
                <input
                  type="checkbox"
                  name="notificationsEnabled"
                  checked={formData.notificationsEnabled}
                  onChange={handleChange}
                />
              </div>

              <input
                type="time"
                name="reminderTime"
                value={formData.reminderTime}
                onChange={handleChange}
                className="w-full bg-black border border-white/10 px-4 py-3 rounded-xl text-white"
              />

              <button className="w-full bg-yellow-500 text-black py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                <Save className="w-4 h-4" />
                Save Settings
              </button>

            </form>
          </div>

        </div>
      </main>
    </div>
  );
}
