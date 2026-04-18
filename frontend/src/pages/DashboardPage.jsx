import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";
import { useAuth } from "../hooks/useAuth";
import { Utensils } from "lucide-react";
import useNotifications from "../hooks/useNotifications";
import {
  LayoutDashboard,
  Dumbbell,
  Apple,
  Calculator,
  MessageSquare,
  Settings,
  LogOut,
  Flame,
  Moon,
  TrendingUp,
  Activity,
  ChevronRight,
  Bell,
  User,
  Salad,
  RefreshCw,
} from "lucide-react";

const getDashboardStats = async (token) => {
  try {
    const res = await fetch("http://localhost:5000/api/dashboard/stats", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!res.ok) return { ok: false, message: data.message };
    return { ok: true, data };
  } catch {
    return { ok: false, message: "Network error" };
  }
};

const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-white/5 rounded-xl ${className}`} />
);

const StatCard = ({ stat, loading }) => {
  const Icon = stat.icon;
  return (
    <div className="group bg-[#111] border border-white/5 p-6 rounded-3xl hover:border-yellow-500/30 transition-all duration-500 hover:bg-[#161616]">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 bg-white/5 rounded-xl ${stat.color}`}>
          <Icon className="w-5 h-5" />
        </div>
        {loading ? (
          <Skeleton className="w-10 h-4" />
        ) : (
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
            {stat.percent}%
          </span>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
          {stat.label}
        </p>
        {loading ? (
          <Skeleton className="w-24 h-8 mt-1" />
        ) : (
          <p className={`text-3xl font-black ${stat.color} tracking-tighter`}>
            {stat.value}
          </p>
        )}
        <p className="text-xs text-gray-600 font-bold">{stat.subtext}</p>
      </div>
      <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full bg-yellow-500/50 rounded-full transition-all duration-700"
          style={{ width: loading ? "0%" : `${stat.percent}%` }}
        />
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  const { user, token, logout } = useAuth();
  const location = useLocation();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationDropdownRef = useRef(null);

  const [dashData, setDashData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboard = useCallback(
    async (isRefresh = false) => {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      setError(null);

      const result = await getDashboardStats(token);
      if (result.ok) {
        setDashData(result.data);
      } else {
        setError(result.message || "Failed to load dashboard");
      }

      setLoading(false);
      setRefreshing(false);
    },
    [token]
  );

  useEffect(() => {
    if (token) fetchDashboard();
  }, [token, fetchDashboard]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!notificationDropdownRef.current?.contains(e.target)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isNotificationsOpen && unreadCount > 0) markAllAsRead();
  }, [isNotificationsOpen, unreadCount, markAllAsRead]);

  const s = dashData?.stats || {};

  const stats = [
    {
      label: "Calories Today",
      value: `${s.todayCalories ?? 0}`,
      subtext: "/ 2,500 kcal",
      color: "text-orange-500",
      icon: Flame,
      percent: Math.min(Math.round(((s.todayCalories ?? 0) / 2500) * 100), 100),
    },
    {
      label: "Protein",
      value: `${s.todayProtein ?? 0}g`,
      subtext: "/ 150g goal",
      color: "text-red-400",
      icon: Dumbbell,
      percent: Math.min(Math.round(((s.todayProtein ?? 0) / 150) * 100), 100),
    },
    {
      label: "Workouts Today",
      value: `${s.todayWorkoutCount ?? 0}`,
      subtext: "sessions",
      color: "text-emerald-500",
      icon: Activity,
      percent: Math.min((s.todayWorkoutCount ?? 0) * 25, 100),
    },
    {
      label: "Meals Logged",
      value: `${s.totalMealsToday ?? 0}`,
      subtext: "/ 5 meals",
      color: "text-purple-500",
      icon: Salad,
      percent: Math.min(Math.round(((s.totalMealsToday ?? 0) / 5) * 100), 100),
    },
  ];

  const goalPercent = Math.round(
    stats.reduce((sum, st) => sum + st.percent, 0) / stats.length
  );

  const weeklyActivity = dashData?.weeklyActivity ?? [
    { day: "Sun", count: 0 },
    { day: "Mon", count: 0 },
    { day: "Tue", count: 0 },
    { day: "Wed", count: 0 },
    { day: "Thu", count: 0 },
    { day: "Fri", count: 0 },
    { day: "Sat", count: 0 },
  ];
  const maxCount = Math.max(...weeklyActivity.map((d) => d.count), 1);

  const sidebarItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/workouts", label: "Workouts", icon: Dumbbell },
    { to: "/exercises", label: "Exercises", icon: Activity },
    { to: "/nutrition", label: "Nutrition", icon: Apple },
    { to: "/meals", label: "Meals", icon: Utensils },
    { to: "/feedback", label: "Support", icon: MessageSquare },
    { to: "/settings", label: "Settings", icon: Settings },
  ];

  const quickActions = [
    { to: "/workouts", label: "Workouts", desc: "Track exercises", icon: Dumbbell, color: "hover:border-orange-500/50 text-orange-500" },
    { to: "/nutrition", label: "Nutrition", desc: "Log meals", icon: Apple, color: "hover:border-green-500/50 text-green-500" },
    { to: "/settings", label: "Settings", desc: "Preferences", icon: Settings, color: "hover:border-blue-500/50 text-blue-500" },
    { to: "/feedback", label: "Support", desc: "Get help", icon: MessageSquare, color: "hover:border-yellow-500/50 text-yellow-500" },
  ];

  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (goalPercent / 100) * circumference;

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sans tracking-tight flex">

      <aside className="w-64 bg-[#111] border-r border-white/5 flex flex-col fixed h-full z-50">
        <Link
          to="/"
          className="p-6 border-b border-white/5 block hover:bg-white/[0.02] transition-colors group"
        >
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

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="text-[10px] font-black text-gray-600 uppercase tracking-wider mb-3 px-3">
            Main
          </p>
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

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
            <div className="w-10 h-10 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black text-white truncate">{user?.fullName}</p>
              <p className="text-[10px] text-gray-500 truncate">{user?.email}</p>
            </div>
            <button onClick={logout} title="Logout">
              <LogOut className="h-4 w-4 text-red-500 hover:text-red-400 transition-colors" />
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8">

        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-black text-white uppercase tracking-tighter">
              Welcome Back,{" "}
              <span className="text-yellow-500">
                {user?.fullName?.split(" ")[0] || "User"}
              </span>
            </h1>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mt-1">
              Goal: {user?.goal || "Maintain"} •{" "}
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchDashboard(true)}
              disabled={refreshing}
              className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
              title="Refresh"
            >
              <RefreshCw
                className={`w-4 h-4 text-gray-400 ${refreshing ? "animate-spin" : ""}`}
              />
            </button>

            <div className="relative" ref={notificationDropdownRef}>
              <button
                className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors relative"
                onClick={() => {
                  const next = !isNotificationsOpen;
                  setIsNotificationsOpen(next);
                  if (next && unreadCount > 0) markAllAsRead();
                }}
              >
                <Bell className="w-5 h-5 text-gray-400" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-3 w-80 max-h-96 overflow-y-auto rounded-2xl border border-white/10 bg-[#111] shadow-2xl z-50">
                  <div className="px-4 py-3 border-b border-white/5">
                    <p className="text-xs font-black text-white uppercase tracking-wider">
                      Notifications
                    </p>
                  </div>
                  {notifications.length > 0 ? (
                    <div className="py-2">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className="px-4 py-3 border-b border-white/5 last:border-b-0 hover:bg-white/[0.03] transition-colors"
                        >
                          <p className="text-sm text-white">{n.message}</p>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-2">
                            {new Date(n.createdAt).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-6 text-center">
                      <p className="text-sm text-gray-400">No notifications yet.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center justify-between">
            <p className="text-red-400 text-xs font-bold uppercase tracking-wider">{error}</p>
            <button
              onClick={() => fetchDashboard()}
              className="text-xs text-red-400 hover:text-red-300 font-black uppercase tracking-wider"
            >
              Retry
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} loading={loading} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[#111] border border-white/5 p-8 rounded-3xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-black text-white uppercase tracking-wider flex items-center gap-3">
                  <Dumbbell className="w-5 h-5 text-yellow-500" />
                  Recent Workouts
                </h2>
                <Link
                  to="/workouts"
                  className="text-[10px] text-yellow-500 font-black uppercase tracking-wider hover:text-yellow-400 transition-colors flex items-center gap-1"
                >
                  View All <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
              {loading ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : dashData?.recentWorkouts?.length > 0 ? (
                <div className="space-y-3">
                  {dashData.recentWorkouts.map((w) => (
                    <div
                      key={w._id}
                      className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-2xl border border-white/5 hover:border-yellow-500/20 hover:bg-[#141414] transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-white/5 rounded-xl">
                          <Dumbbell className="w-4 h-4 text-emerald-500" />
                        </div>
                        <div>
                          <p className="text-xs font-black text-white uppercase tracking-tight">
                            {w.exercise?.name || "—"}
                          </p>
                          <p className="text-[10px] text-gray-600 font-bold uppercase mt-0.5">
                            {w.sets} sets × {w.reps} reps
                            {w.weight > 0 ? ` · ${w.weight}kg` : ""}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-600 font-bold">
                        {new Date(w.workoutDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 gap-3">
                  <Dumbbell className="w-8 h-8 text-gray-700" />
                  <p className="text-gray-600 text-xs font-bold uppercase tracking-wider">
                    No workouts yet
                  </p>
                  <Link
                    to="/workouts"
                    className="text-[10px] text-yellow-500 font-black uppercase tracking-wider hover:text-yellow-400"
                  >
                    Add your first workout →
                  </Link>
                </div>
              )}
            </div>

            <div className="bg-[#111] border border-white/5 p-8 rounded-3xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-black text-white uppercase tracking-wider flex items-center gap-3">
                  <Utensils className="w-5 h-5 text-yellow-500" />
                  Recent Meals
                </h2>
                <Link
                  to="/nutrition"
                  className="text-[10px] text-yellow-500 font-black uppercase tracking-wider hover:text-yellow-400 transition-colors flex items-center gap-1"
                >
                  View All <ChevronRight className="w-3 h-3" />
                </Link>
              </div>

              {loading ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : dashData?.recentMeals?.length > 0 ? (
                <div className="space-y-3">
                  {dashData.recentMeals.map((m) => (
                    <div
                      key={m._id}
                      className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-2xl border border-white/5 hover:border-yellow-500/20 hover:bg-[#141414] transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-white/5 rounded-xl">
                          <Utensils className="w-4 h-4 text-orange-500" />
                        </div>
                        <div>
                          <p className="text-xs font-black text-white uppercase tracking-tight">
                            {m.foodName}
                          </p>
                          <p className="text-[10px] text-gray-600 font-bold uppercase mt-0.5">
                            {m.mealType?.name || "—"} · {m.protein}g P · {m.carbs}g C · {m.fats}g F
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-black text-orange-500">
                          {m.calories}
                        </span>
                        <p className="text-[10px] text-gray-600 font-bold">kcal</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 gap-3">
                  <Utensils className="w-8 h-8 text-gray-700" />
                  <p className="text-gray-600 text-xs font-bold uppercase tracking-wider">
                    No meals logged today
                  </p>
                  <Link
                    to="/nutrition"
                    className="text-[10px] text-yellow-500 font-black uppercase tracking-wider hover:text-yellow-400"
                  >
                    Log your first meal →
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#111] border border-white/5 p-8 rounded-3xl text-center">
              <h2 className="text-lg font-black text-white mb-6 uppercase tracking-wider">
                Daily Goal
              </h2>

              <div className="relative w-40 h-40 mx-auto mb-6">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                  <circle
                    cx="80" cy="80" r="70"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="80" cy="80" r="70"
                    stroke="#eab308"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={loading ? circumference : strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  {loading ? (
                    <Skeleton className="w-14 h-10" />
                  ) : (
                    <span className="text-4xl font-black text-white">
                      {goalPercent}%
                    </span>
                  )}
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">
                    Completed
                  </span>
                </div>
              </div>

              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-6">
                {goalPercent >= 100
                  ? "🎉 All goals done!"
                  : goalPercent >= 50
                  ? "Keep pushing!"
                  : "Let's get started!"}
              </p>

              <div className="space-y-3">
                {[
                  { icon: Flame, label: "Calories", value: `${s.todayCalories ?? 0} kcal`, color: "text-orange-500" },
                  { icon: Dumbbell, label: "Workouts", value: `${s.todayWorkoutCount ?? 0}`, color: "text-emerald-500" },
                  { icon: Calculator, label: "Carbs", value: `${s.todayCarbs ?? 0}g`, color: "text-blue-500" },
                  { icon: Moon, label: "Fats", value: `${s.todayFats ?? 0}g`, color: "text-purple-500" },
                  { icon: Salad, label: "Meals", value: `${s.totalMealsToday ?? 0} / 5`, color: "text-yellow-500" },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div
                    key={label}
                    className="flex justify-between items-center p-4 bg-[#0a0a0a] rounded-xl border border-white/5"
                  >
                    <span className="text-[10px] font-black text-gray-500 uppercase flex items-center gap-2">
                      <Icon className="w-3 h-3" /> {label}
                    </span>
                    {loading ? (
                      <Skeleton className="w-14 h-4" />
                    ) : (
                      <span className={`text-sm font-black ${color}`}>{value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {!loading && dashData && (
              <div className="bg-[#111] border border-white/5 p-6 rounded-3xl">
                <h2 className="text-sm font-black text-white mb-4 uppercase tracking-wider">
                  Macros Breakdown
                </h2>
                <div className="space-y-4">
                  {[
                    { label: "Protein", value: s.todayProtein ?? 0, max: 150, color: "bg-red-400" },
                    { label: "Carbs", value: s.todayCarbs ?? 0, max: 300, color: "bg-blue-400" },
                    { label: "Fats", value: s.todayFats ?? 0, max: 80, color: "bg-yellow-400" },
                  ].map((macro) => (
                    <div key={macro.label}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-[10px] font-black text-gray-500 uppercase">
                          {macro.label}
                        </span>
                        <span className="text-[10px] font-black text-gray-400">
                          {macro.value}g / {macro.max}g
                        </span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${macro.color} rounded-full transition-all duration-700`}
                          style={{
                            width: `${Math.min((macro.value / macro.max) * 100, 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;