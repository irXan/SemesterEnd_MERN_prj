import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const HeroSection = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative min-h-[800px] flex items-center overflow-hidden bg-gray-950">
      
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt="Fitness Background" 
          className="w-full h-full object-cover opacity-40 scale-100 animate-slow-zoom"
        />
        
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-transparent to-blue-900/20 animate-gradient-slow"></div>
        
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
  <div className="max-w-2xl"> 
    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-5 leading-[1.2] animate-fade-in-up">
      Track Your Progress, <br />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 animate-text-shimmer">
        Transform Your Life
      </span>
    </h1>
    
    <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-xl animate-fade-in-up delay-200">
      Experience the ultimate fitness and nutrition tracker. Log your workouts, 
      monitor your nutrition, and visualize your progress with professional-grade tools.
    </p>

    <div className="flex flex-wrap gap-4 animate-fade-in-up delay-500">
      <Link
        to={isAuthenticated ? "/dashboard" : "/register"}
        className="relative group inline-flex items-center justify-center overflow-hidden rounded-full bg-blue-600 px-8 py-4 font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/30"
      >
        <span className="relative z-10">Get Started</span>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-700 opacity-0 transition-opacity group-hover:opacity-100"></div>
      </Link>
    </div>

  </div>
</div>
      <style jsx>{`
        @keyframes slowZoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slow-zoom {
          animation: slowZoom 20s infinite ease-in-out;
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }
        .delay-200 { animation-delay: 0.2s; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>
    </div>
  );
};

export default HeroSection;
