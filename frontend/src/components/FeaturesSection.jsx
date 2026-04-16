import React from 'react';
import { 
  Dumbbell, 
  Apple, 
  Activity, 
  LayoutDashboard, 
  Smartphone, 
  ShieldCheck, 
} from "lucide-react";
import { motion } from 'framer-motion';

const FeaturesSection = () => {
  const features = [
    {
      title: 'Workout Tracking',
      description: 'Create and manage your workout routines with ease. Log exercise names, sets, reps, and weights.',
      icon: Dumbbell,
      color: 'from-yellow-500 to-orange-600',
    },
    {
      title: 'Nutrition Logging',
      description: 'Log daily food intake, track calories and macros, and categorize meal types for better insights.',
      icon: Apple,
      color: 'from-yellow-500 to-orange-600',
    },
    {
      title: 'Progress Visualization',
      description: 'Record body metrics and performance over time. View interactive charts of your fitness journey.',
      icon: Activity,
      color: 'from-yellow-500 to-orange-600',
    },
    {
      title: 'User Dashboard',
      description: 'Get a personalized overview of your workouts, nutrition, and overall progress in one place.',
      icon: LayoutDashboard,
      color: 'from-yellow-500 to-orange-600',
    },
    {
      title: 'Mobile Responsive',
      description: 'Access your data on any device, anywhere. Stay consistent with our fully responsive design.',
      icon: Smartphone,
      color: 'from-yellow-500 to-orange-600',
    },
    {
      title: 'Secure & Private',
      description: 'Your data is encrypted and handled with care, following international privacy regulations.',
      icon: ShieldCheck,
      color: 'from-yellow-500 to-orange-600',
    }
  ];

 
  const headingVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden font-sans tracking-tight">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[120px] -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[120px] translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <motion.div 
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-yellow-500 font-black text-[10px] uppercase tracking-[0.3em] mb-6 inline-block">
            Capabilities
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">
            Elevate Your <span className="text-yellow-500">Fitness Game</span>
          </h2>
          <p className="text-sm font-bold text-gray-500 max-w-2xl mx-auto uppercase tracking-wider leading-relaxed">
            A comprehensive suite of tools designed to help you crush your goals, 
            built with high-performance tracking and modern tech.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={cardVariants}
              className="group relative p-8 rounded-3xl bg-[#111] border border-white/5 
                         hover:border-yellow-500/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] 
                         transition-all duration-500 ease-out overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.02] bg-yellow-500 transition-opacity duration-500"></div>

              <div className="relative mb-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center 
                                   bg-gradient-to-br ${feature.color} text-black
                                   transform group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-yellow-500/20`}>
                  <feature.icon size={24} strokeWidth={2.5} />
                </div>
              </div>

              <h3 className="text-sm font-black text-white mb-4 uppercase tracking-[0.1em] group-hover:text-yellow-500 transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-gray-500 leading-relaxed text-xs font-bold uppercase tracking-wide">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;