import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-slate-50 dark:bg-slate-900 transition-colors duration-500">
      {/* Soft gradient blur */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-pink-light/30 via-slate-50 to-slate-50 dark:from-brand-pink/10 dark:via-slate-900 dark:to-slate-900"></div>
      
      {/* Animated Shapes - Using CSS animations instead of JS framer-motion for Mobile PageSpeed */}
      <div
        className="absolute top-[-5%] left-[-10%] w-[50vw] sm:w-[40vw] h-[50vw] sm:h-[40vw] rounded-full bg-brand-pink/20 dark:bg-brand-pink/10 blur-2xl sm:blur-3xl mix-blend-multiply dark:mix-blend-lighten animate-float"
      />
      
      {/* Hidden on very small screens to save rendering overhead */}
      <div
        className="hidden sm:block absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-gold/20 dark:bg-brand-gold/10 blur-3xl mix-blend-multiply dark:mix-blend-lighten animate-float-reverse"
      />

      {/* Reduced size & blur on mobile */}
      <div
        className="absolute bottom-[10%] sm:top-[40%] right-[-5%] sm:left-[60%] w-[40vw] sm:w-[30vw] h-[40vw] sm:h-[30vw] rounded-full bg-rose-300/20 dark:bg-rose-900/20 blur-2xl sm:blur-3xl mix-blend-multiply dark:mix-blend-lighten animate-float-delayed"
      />
    </div>
  );
};

export default AnimatedBackground;
