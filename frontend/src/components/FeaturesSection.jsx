import React from 'react';

const FeaturesSection = () => {
  const features = [
    {
      title: 'Workout Tracking',
      description: 'Create and manage your workout routines with ease. Log exercise names, sets, reps, and weights.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: 'from-blue-500 to-cyan-400',
      bgLight: 'bg-blue-50'
    },
    {
      title: 'Nutrition Logging',
      description: 'Log daily food intake, track calories and macros, and categorize meal types for better insights.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.703 2.703 0 01-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 01-1.5-.454M3 8V4a2 2 0 012-2h14a2 2 0 012 2v4M3 8v12a2 2 0 002 2h14a2 2 0 002-2V8M3 8h18" />
        </svg>
      ),
      color: 'from-green-500 to-emerald-400',
      bgLight: 'bg-green-50'
    },
    {
      title: 'Progress Visualization',
      description: 'Record body metrics and performance over time. View interactive charts of your fitness journey.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      ),
      color: 'from-purple-500 to-indigo-400',
      bgLight: 'bg-purple-50'
    },
    {
      title: 'User Dashboard',
      description: 'Get a personalized overview of your workouts, nutrition, and overall progress in one place.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      color: 'from-orange-500 to-amber-400',
      bgLight: 'bg-orange-50'
    },
    {
      title: 'Mobile Responsive',
      description: 'Access your data on any device, anywhere. Stay consistent with our fully responsive design.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      color: 'from-teal-500 to-cyan-400',
      bgLight: 'bg-teal-50'
    },
    {
      title: 'Secure & Private',
      description: 'Your data is encrypted and handled with care, following international privacy regulations.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: 'from-red-500 to-rose-400',
      bgLight: 'bg-red-50'
    }
  ];

  return (
    <section className="py-32 bg-[#F8FAFC] relative overflow-hidden">
      {/* Dynamic Background Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[120px] -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-100/30 rounded-full blur-[120px] translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section with Fade-In */}
        <div className="text-center mb-24 motion-safe:animate-[slideUpFade_0.7s_ease-out_both]">
          <span className="px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 font-bold text-xs uppercase tracking-[0.2em] mb-6 inline-block">
            Capabilities
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 tracking-tight">
            Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Fitness Game</span>
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            A comprehensive suite of tools designed to help you crush your goals, 
            built with the latest tech for maximum performance.
          </p>
        </div>
        
        {/* Features Grid with Staggered Hover Effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative p-10 rounded-[2.5rem] bg-white border border-slate-200/60 
                         hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:-translate-y-2 
                         transition-all duration-500 ease-out overflow-hidden"
            >
              {/* Subtle background gradient on hover */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-[0.03] bg-gradient-to-br ${feature.color} transition-opacity duration-500`}></div>

              {/* Icon with Glowing Effect */}
              <div className="relative mb-10">
                <div className={`absolute inset-0 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-2xl bg-gradient-to-br ${feature.color}`}></div>
                <div className={`relative w-20 h-20 rounded-2xl flex items-center justify-center 
                                 shadow-sm bg-gradient-to-br ${feature.color} text-white
                                 transform group-hover:rotate-[10deg] transition-transform duration-500`}>
                  {feature.icon}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-slate-500 leading-relaxed text-lg">
                {feature.description}
              </p>

              {/* Decorative Arrow that appears on hover */}
              <div className="mt-8 flex items-center text-blue-600 font-bold text-sm opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                Learn more <span className="ml-2">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;