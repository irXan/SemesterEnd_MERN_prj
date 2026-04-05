import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
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
  const { user, logout } = useAuth();
  const location = useLocation();

  // Mock stats data (replace with actual data from your API)
  const stats = [
    { label: "Hydration", value: "0L", subtext: "/ 3L", color: "text-blue-500", icon: Droplets },
    { label: "Calories", value: "0", subtext: "/ 2,500 kcal", color: "text-orange-500", icon: Flame },
    { label: "Steps", value: "0", subtext: "/ 10,000", color: "text-emerald-500", icon: Footprints },
    { label: "Sleep", value: "0h", subtext: "/ 8h", color: "text-purple-500", icon: Moon },
  ];

  const sidebarItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/workouts", label: "Workouts", icon: Dumbbell },
    { to: "/nutrition", label: "Nutrition", icon: Apple },
    { to: "/goals", label: "Goals", icon: Target },
    { to: "/bmi", label: "BMI Calculator", icon: Calculator },
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
          <div>
            <h1 className="text-2xl font-black text-white uppercase tracking-tighter">
              Welcome Back, <span className="text-yellow-500">{user?.fullName?.split(" ")[0] || "User"}</span>
            </h1>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mt-1">
              Goal: {user?.goal || "Maintain"} • {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors relative">
              <Bell className="w-5 h-5 text-gray-400" />
              {user?.notificationsEnabled && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full"></span>
              )}
            </button>
          </div>
        </header>

        {/* --- Stats Grid --- */}
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
          
          {/* --- Left Column --- */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Quick Actions */}
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

            {/* Activity Chart Placeholder */}
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

          {/* --- Right Column --- */}
          <div className="space-y-6">
            
            {/* Daily Goal Circle */}
            <div className="bg-[#111] border border-white/5 p-8 rounded-3xl text-center">
              <h2 className="text-lg font-black text-white mb-6 uppercase tracking-wider">Daily Goal</h2>
              
              <div className="relative w-40 h-40 mx-auto mb-6">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="80" cy="80" r="70" stroke="rgba(255,255,255,0.05)" strokeWidth="12" fill="none"/>
                  <circle cx="80" cy="80" r="70" stroke="#eab308" strokeWidth="12" fill="none" strokeDasharray="440" strokeDashoffset="440" strokeLinecap="round"/>
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

            {/* Hydration Widget */}
            <div className="bg-[#111] border border-white/5 p-6 rounded-3xl">
              <h3 className="text-sm font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-500" /> Hydration
              </h3>
              <div className="flex gap-2 flex-wrap justify-center">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-10 h-12 border-2 border-blue-500/20 rounded-lg bg-blue-500/5 hover:bg-blue-500/20 hover:border-blue-500/40 transition-all cursor-pointer"></div>
                ))}
              </div>
              <p className="text-[10px] text-gray-600 mt-4 text-center font-bold uppercase">0/8 glasses • 250ml each</p>
            </div>

          </div>
        </div>

        {/* --- Footer --- */}
        <footer className="mt-8 bg-[#111] border border-white/5 p-6 rounded-3xl">
          <p className="text-gray-600 text-xs font-bold uppercase tracking-wider text-center">
            Week 4 Updates: Settings, Notifications toggle, Support/Feedback, and filters are now available.
          </p>
        </footer>

      </main>
    </div>
  );
};

export default DashboardPage;