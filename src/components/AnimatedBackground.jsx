import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-slate-50 dark:bg-slate-900 transition-colors duration-500">
      {/* Soft gradient blur */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-pink-light/30 via-slate-50 to-slate-50 dark:from-brand-pink/10 dark:via-slate-900 dark:to-slate-900"></div>
      
      {/* Animated Shapes */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-brand-pink/20 dark:bg-brand-pink/10 blur-3xl mix-blend-multiply dark:mix-blend-lighten"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-gold/20 dark:bg-brand-gold/10 blur-3xl mix-blend-multiply dark:mix-blend-lighten"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <motion.div
        className="absolute top-[40%] left-[60%] w-[30vw] h-[30vw] rounded-full bg-rose-300/20 dark:bg-rose-900/20 blur-3xl mix-blend-multiply dark:mix-blend-lighten"
        animate={{
          x: [0, -50, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </div>
  );
};

export default AnimatedBackground;
