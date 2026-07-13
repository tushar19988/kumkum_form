import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const SubmitButton = ({ isSubmitting }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type="submit"
      disabled={isSubmitting}
      className={`w-full relative overflow-hidden rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white py-4 px-6 font-semibold shadow-lg shadow-green-500/30 flex items-center justify-center gap-3 transition-all duration-300 ${
        isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-green-500/50'
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
            <MessageCircle size={22} />
          </motion.div>
          <span>Send on WhatsApp</span>
        </>
      )}
    </motion.button>
  );
};

export default SubmitButton;
