import React from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const SubmitButton = ({ isSubmitting }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type="submit"
      disabled={isSubmitting}
      className={`w-full relative overflow-hidden rounded-xl bg-gradient-to-r from-brand-pink to-brand-gold text-white py-4 px-6 font-semibold shadow-lg shadow-brand-pink/30 flex items-center justify-center gap-3 transition-all duration-300 ${
        isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-brand-pink/50'
      }`}
    >
      <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
      
      {isSubmitting ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
        />
      ) : (
        <>
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <Send size={20} />
          </motion.div>
          <span>Register Now</span>
        </>
      )}
    </motion.button>
  );
};

export default SubmitButton;
