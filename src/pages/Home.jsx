import React from 'react';
import { motion } from 'framer-motion';
import AnimatedBackground from '../components/AnimatedBackground';
import ThemeToggle from '../components/ThemeToggle';
import FormCard from '../components/FormCard';

const Home = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <ThemeToggle />
      <AnimatedBackground />
      
      <div className="w-full max-w-4xl mx-auto z-10 flex flex-col items-center">
        
        <FormCard />
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm p-3 rounded-xl border border-white/10">
            🔒 Your information is secure and only shared with 
            <span className="font-semibold text-brand-pink dark:text-brand-pink-light"> Kumkum Beauty Care</span>.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
