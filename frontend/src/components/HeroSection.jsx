import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion"; 

const HeroSection = () => {
  const { isAuthenticated } = useAuth();

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        delay: custom, 
        ease: [0.215, 0.61, 0.355, 1] 
      }
    })
  };

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0a] font-sans tracking-tight pt-24">
      
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt="Fitness Background" 
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-[160px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl"> 
          
          <motion.h1 
            custom={0.2}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-6 leading-[0.9] uppercase"
          >
            Track Your <br />
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-yellow-500 italic"
            >
              Progress,
            </motion.span> <br />
            <span className="text-white">Transform Life</span>
          </motion.h1>

          <motion.p 
            custom={0.4}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-sm md:text-lg text-gray-500 font-bold uppercase tracking-wider mb-10 max-w-xl leading-relaxed"
          >
            Experience elite fitness tracking. Built for those who demand 
            maximum performance and precise visualization.
          </motion.p>

          <motion.div 
            custom={0.6}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="flex flex-wrap gap-5"
          >
            <Link
              to={isAuthenticated ? "/dashboard" : "/register"}
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-yellow-500 px-10 py-5 font-black text-xs text-black uppercase tracking-[0.2em] transition-all hover:bg-white hover:scale-105 active:scale-95 shadow-2xl shadow-yellow-500/20"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        /* Keep the slow zoom for continuous movement */
        @keyframes continuousZoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        img {
          animation: continuousZoom 30s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;