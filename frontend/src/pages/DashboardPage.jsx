import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Home, Utensils } from "lucide-react";
import useNotifications from "../hooks/useNotifications";
import {
  LayoutDashboard,
  Dumbbell,
  Apple,
  Target,
  Calculator,
  MessageSquare,
  Settings,
  LogOut,
  Droplets,
  Flame,
  Footprints,
  Moon,
  TrendingUp,
  Activity,
  ChevronRight,
  Bell,
  User
} from "lucide-react";

const DashboardPage = () => {
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!notificationDropdownRef.current?.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isNotificationsOpen && unreadCount > 0) {
      markAllAsRead();
    }
  }, [isNotificationsOpen, unreadCount, markAllAsRead]);


  const stats = [
    { label: "Hydration", value: "0L", subtext: "/ 3L", color: "text-blue-500", icon: Droplets },
    { label: "Calories", value: "0", subtext: "/ 2,500 kcal", color: "text-orange-500", icon: Flame },
    { label: "Steps", value: "0", subtext: "/ 10,000", color: "text-emerald-500", icon: Footprints },
    { label: "Sleep", value: "0h", subtext: "/ 8h", color: "text-purple-500", icon: Moon },
  ];

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

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sans tracking-tight flex">


      <aside className="w-64 bg-[#111] border-r border-white/5 flex flex-col fixed h-full z-50">
        <Link to="/" className="p-6 border-b border-white/5 block hover:bg-white/[0.02] transition-colors group">
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
          <p className="text-[10px] font-black text-gray-600 uppercase tracking-wider mb-3 px-3">Main</p>
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${isActive
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


        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-black text-white uppercase tracking-tighter">
              Welcome Back, <span className="text-yellow-500">{user?.fullName?.split(" ")[0] || "User"}</span>
            </h1>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mt-1">
              Goal: {user?.goal || "Maintain"} • {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative" ref={notificationDropdownRef}>
              <button
                className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors relative"
                onClick={() => {
                  const nextIsOpen = !isNotificationsOpen;
                  setIsNotificationsOpen(nextIsOpen);

                  if (nextIsOpen && unreadCount > 0) {
                    markAllAsRead();
                  }
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
                    <p className="text-xs font-black text-white uppercase tracking-wider">Notifications</p>
                  </div>

                  {notifications.length > 0 ? (
                    <div className="py-2">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="px-4 py-3 border-b border-white/5 last:border-b-0 hover:bg-white/[0.03] transition-colors"
                        >
                          <p className="text-sm text-white">{notification.message}</p>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-2">
                            {new Date(notification.createdAt).toLocaleString()}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-[#111] border border-white/5 p-6 rounded-3xl hover:border-yellow-500/30 transition-all duration-500 hover:bg-[#161616]"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 bg-white/5 rounded-xl ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">0%</span>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">{stat.label}</p>
                <p className={`text-3xl font-black ${stat.color} tracking-tighter`}>
                  {stat.value}
                </p>
                <p className="text-xs text-gray-600 font-bold">{stat.subtext}</p>
              </div>
              <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500/30 w-0 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-8">

            <div className="bg-[#111] border border-white/5 p-8 rounded-3xl">
              <h2 className="text-lg font-black text-white mb-6 uppercase tracking-wider flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-yellow-500" />
                Quick Actions
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    to={action.to}
                    className={`group flex items-center gap-4 p-5 bg-[#0a0a0a] rounded-2xl border border-white/5 hover:border-yellow-500/30 hover:bg-[#161616] transition-all duration-500`}
                  >
                    <div className={`p-3 bg-white/5 rounded-xl ${action.color} group-hover:scale-110 transition-transform duration-300`}>
                      <action.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-black text-white uppercase tracking-tight group-hover:text-yellow-500 transition-colors duration-300">
                        {action.label}
                      </h3>
                      <p className="text-[10px] text-gray-600 font-bold uppercase tracking-wider mt-1">{action.desc}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-yellow-500 transition-colors duration-300" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-[#111] border border-white/5 p-8 rounded-3xl">
              <h2 className="text-lg font-black text-white mb-6 uppercase tracking-wider flex items-center gap-3">
                <Activity className="w-5 h-5 text-yellow-500" />
                Activity Trends
              </h2>
              <div className="h-64 flex items-end justify-between gap-3 px-4">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                  <div key={day} className="flex flex-col items-center gap-2 flex-1">
                    <div
                      className="w-full bg-yellow-500/20 rounded-t-lg border-t-2 border-yellow-500 transition-all duration-500 hover:bg-yellow-500/40"
                      style={{ height: `${Math.random() * 60 + 20}%` }}
                    ></div>
                    <span className="text-[10px] text-gray-600 font-bold uppercase">{day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>


          <div className="space-y-6">

            <div className="bg-[#111] border border-white/5 p-8 rounded-3xl text-center">
              <h2 className="text-lg font-black text-white mb-6 uppercase tracking-wider">Daily Goal</h2>

              <div className="relative w-40 h-40 mx-auto mb-6">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="80" cy="80" r="70" stroke="rgba(255,255,255,0.05)" strokeWidth="12" fill="none" />
                  <circle cx="80" cy="80" r="70" stroke="#eab308" strokeWidth="12" fill="none" strokeDasharray="440" strokeDashoffset="440" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black text-white">0%</span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">Completed</span>
                </div>
              </div>

              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-6">Keep pushing!</p>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-[#0a0a0a] rounded-xl border border-white/5">
                  <span className="text-[10px] font-black text-gray-500 uppercase flex items-center gap-2">
                    <Moon className="w-3 h-3" /> Sleep
                  </span>
                  <span className="text-sm font-black text-purple-500">0h</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-[#0a0a0a] rounded-xl border border-white/5">
                  <span className="text-[10px] font-black text-gray-500 uppercase flex items-center gap-2">
                    <Dumbbell className="w-3 h-3" /> Weight
                  </span>
                  <span className="text-sm font-black text-emerald-500">0kg</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-[#0a0a0a] rounded-xl border border-white/5">
                  <span className="text-[10px] font-black text-gray-500 uppercase flex items-center gap-2">
                    <Calculator className="w-3 h-3" /> BMI
                  </span>
                  <span className="text-sm font-black text-blue-500">24.2</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-[#0a0a0a] rounded-xl border border-white/5">
                  <span className="text-[10px] font-black text-gray-500 uppercase flex items-center gap-2">
                    <Flame className="w-3 h-3" /> Kcal Left
                  </span>
                  <span className="text-sm font-black text-orange-500">2,500</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
};

export default DashboardPage;
