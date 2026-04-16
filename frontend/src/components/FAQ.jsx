import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQData = [
  {
    question: "How do I sync my workout data?",
    answer: "You can sync your data automatically by connecting your wearable device in the Profile settings, or manually log your activities via the 'Workouts' quick action button."
  },
  {
    question: "Can I add my Workout?", 
    answer: "Yes! Head over to the Dashboard, click on 'Workout', and you can add your workout like Chest, Leg, Back etc."
  },
  {
    question: "Can I set custom daily goals?",
    answer: "Absolutely. Head over to the Dashboard, click on 'Daily Goal', and you can adjust your targets for hydration, calories, and steps."
  },
  {
    question: "How can i add my Nutrition",
    answer: "First you go to the Dashboard, click on 'Nutrition', and you can add your Meal and set Calories, Protein, Carbs, Fat."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const headingVariants = {
    hidden: { opacity: 0, y: -40 },
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

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8 font-sans overflow-hidden">
      <div className="max-w-3xl mx-auto">
        
        <motion.div 
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-[#ffb703] text-xs font-bold tracking-widest uppercase border border-[#ffb703]/30 px-3 py-1 rounded-full bg-[#ffb703]/10">
            Support Center
          </span>
          <h2 className="text-5xl font-extrabold mt-6 tracking-tight uppercase">
            Frequently Asked <span className="text-[#ffb703]">Questions</span>
          </h2>
          <p className="text-gray-400 mt-4 text-lg">
            Everything you need to know about the next-gen fitness experience.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {FAQData.map((item, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className={`border rounded-2xl bg-[#121212] overflow-hidden transition-all duration-300 ${
                activeIndex === index ? 'border-[#ffb703] shadow-[0_0_20px_rgba(255,183,3,0.1)]' : 'border-white/10'
              }`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-[#ffb703]/5 transition-colors focus:outline-none select-none"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <span className={`text-lg font-semibold tracking-wide transition-colors duration-300 ${activeIndex === index ? 'text-[#ffb703]' : 'text-white'}`}>
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="text-[#ffb703]" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;