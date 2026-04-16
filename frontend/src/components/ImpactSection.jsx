import React from 'react';
import { Users, Zap, Trophy, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const ImpactCard = ({ item, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col items-center text-center group"
    >
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ 
          duration: 0.8, 
          delay: index * 0.2, 
          ease: [0.215, 0.61, 0.355, 1]
        }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="mb-4 p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-yellow-500 group-hover:border-yellow-500 transition-all duration-500"
      >
        <item.icon className="w-8 h-8 text-yellow-500 group-hover:text-black transition-colors" />
      </motion.div>

      <motion.h3 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
        className="text-4xl md:text-5xl font-black text-white tracking-tighter italic"
      >
        {item.value}
      </motion.h3>

      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] mt-3 group-hover:text-yellow-500 transition-colors">
        {item.label}
      </p>

      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: "24px" }}
        transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
        className="h-[2px] bg-yellow-500 mt-2"
      />
    </motion.div>
  );
};

const SimpleImpactSection = () => {
  const impactData = [
    { icon: Users, label: "Active Users", value: "500K+" },
    { icon: Zap, label: "Workouts Logged", value: "2M+" },
    { icon: Trophy, label: "Goals Reached", value: "150K" },
    { icon: Globe, label: "Countries", value: "40+" },
  ];

  return (
    <div className="bg-[#0a0a0a] py-24 border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {impactData.map((item, index) => (
            <ImpactCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimpleImpactSection;