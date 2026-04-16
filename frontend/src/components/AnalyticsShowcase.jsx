import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, Activity, Zap, BarChart3, ChevronRight, 
  Droplets, Flame, Footprints, Moon, Dumbbell, Apple 
} from 'lucide-react';
import { motion } from 'framer-motion';

const AnalyticsShowcase = () => {
  const navigate = useNavigate(); 

  const dashboardVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 } 
    }
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: 0.5 + (i * 0.1), duration: 0.5, ease: "easeOut" }
    })
  };

  return (
    <section className="bg-[#0a0a0a] py-24 relative overflow-hidden font-sans tracking-tight">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-[140px] z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            variants={dashboardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-20">
              <div className="mb-8">
                <h4 className="text-white font-black text-xl uppercase tracking-tighter">
                  Welcome Back, <span className="text-yellow-500 italic">Haris</span>
                </h4>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mt-1">
                  Goal: Maintain • Wednesday, April 8
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Hydration", val: "0L", sub: "/ 3L", icon: Droplets, color: "text-blue-500", bg: "bg-blue-500/5" },
                  { label: "Calories", val: "0", sub: "/ 2,500", icon: Flame, color: "text-orange-500", bg: "bg-orange-500/5" },
                  { label: "Steps", val: "0", sub: "/ 10,000", icon: Footprints, color: "text-emerald-500", bg: "bg-emerald-500/5" },
                  { label: "Sleep", val: "0h", sub: "/ 8h", icon: Moon, color: "text-purple-500", bg: "bg-purple-500/5" },
                ].map((s, i) => (
                  <motion.div 
                    key={i}
                    custom={i}
                    variants={statVariants}
                    className="bg-[#111] border border-white/5 p-5 rounded-3xl"
                  >
                    <div className={`w-8 h-8 ${s.bg} rounded-lg flex items-center justify-center mb-4`}>
                      <s.icon className={`w-4 h-4 ${s.color}`} />
                    </div>
                    <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-1">{s.label}</p>
                    <p className={`text-2xl font-black ${s.color} tracking-tighter`}>{s.val}</p>
                    <p className="text-[9px] text-gray-600 font-bold uppercase">{s.sub}</p>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <motion.div initial={{opacity:0}} whileInView={{opacity:1}} transition={{delay:0.8}} className="bg-[#111] border border-white/5 p-6 rounded-3xl">
                    <h5 className="text-white text-[10px] font-black uppercase tracking-widest mb-5 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-yellow-500" /> Quick Actions
                    </h5>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center justify-between p-4 bg-[#0a0a0a] border border-white/5 rounded-2xl">
                        <div className="flex items-center gap-3">
                          <Dumbbell className="w-4 h-4 text-orange-500" />
                          <span className="text-[10px] text-gray-400 font-black uppercase">Workouts</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-[#0a0a0a] border border-white/5 rounded-2xl">
                        <div className="flex items-center gap-3">
                          <Apple className="w-4 h-4 text-emerald-500" />
                          <span className="text-[10px] text-gray-400 font-black uppercase">Nutrition</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div initial={{opacity:0}} whileInView={{opacity:1}} transition={{delay:1}} className="bg-[#111] border border-white/5 p-6 rounded-3xl">
                    <h5 className="text-white text-[10px] font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-yellow-500" /> Activity Trends
                    </h5>
                    <div className="flex items-end justify-between gap-2 h-16 px-2">
                      {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          transition={{ duration: 1, delay: 1.2 + (i * 0.05) }}
                          className="flex-1 bg-yellow-500/10 rounded-t-sm border-t-2 border-yellow-500/40"
                        ></motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                <motion.div initial={{scale:0.9, opacity:0}} whileInView={{scale:1, opacity:1}} transition={{delay:1.2}} className="bg-[#111] border border-white/5 p-8 rounded-3xl flex flex-col items-center justify-center">
                  <h5 className="text-white text-[10px] font-black uppercase tracking-widest mb-6 text-center">Daily Goal</h5>
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="56" cy="56" r="48" stroke="rgba(255,255,255,0.03)" strokeWidth="8" fill="none"/>
                      <circle cx="56" cy="56" r="48" stroke="#eab308" strokeWidth="8" fill="none" strokeDasharray="301.6" strokeDashoffset="301.6" strokeLinecap="round" className="animate-draw-circle" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-black text-white">0%</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full mb-8 w-fit">
              <BarChart3 className="w-4 h-4 text-yellow-500" />
              <span className="text-yellow-500 text-[10px] font-black uppercase tracking-[0.2em]">Next-Gen Tracking</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">
              Visual <br />
              <span className="text-yellow-500 italic">Intelligence</span>
            </h2>

            <p className="text-gray-500 text-lg font-bold uppercase tracking-wide leading-relaxed mb-10 max-w-lg">
              Experience the dashboard of the future.Every metric, every goal, every victory—visualized in high-definition.
            </p>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')} 
              className="w-fit flex items-center gap-4 bg-yellow-500 text-black px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white transition-all shadow-xl shadow-yellow-500/20"
            >
              Get Full Access<ChevronRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes drawCircle { to { stroke-dashoffset: 280; } }
        .animate-draw-circle { animation: drawCircle 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
      `}</style>
    </section>
  );
};

export default AnalyticsShowcase;