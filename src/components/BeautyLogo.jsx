import React from 'react';
import { motion } from 'framer-motion';

const BeautyLogo = ({ className = "w-16 h-16" }) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <defs>
        <linearGradient id="pinkGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f472b6" /> {/* brand-pink */}
          <stop offset="100%" stopColor="#fbbf24" /> {/* brand-gold */}
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Background Sparkles */}
      <motion.circle cx="80" cy="20" r="2" fill="url(#pinkGold)" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} />
      <motion.circle cx="20" cy="30" r="1.5" fill="url(#pinkGold)" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }} />
      <motion.circle cx="85" cy="70" r="1.5" fill="url(#pinkGold)" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2.2, delay: 1 }} />

      {/* Lotus Base */}
      <path
        d="M 50 85 Q 20 80 15 55 Q 35 60 50 85"
        fill="url(#pinkGold)"
        opacity="0.8"
      />
      <path
        d="M 50 85 Q 80 80 85 55 Q 65 60 50 85"
        fill="url(#pinkGold)"
        opacity="0.8"
      />
      <path
        d="M 50 85 Q 35 65 30 40 Q 50 55 50 85"
        fill="url(#pinkGold)"
        opacity="0.9"
      />
      <path
        d="M 50 85 Q 65 65 70 40 Q 50 55 50 85"
        fill="url(#pinkGold)"
        opacity="0.9"
      />
      <path
        d="M 50 85 Q 45 55 50 30 Q 55 55 50 85"
        fill="url(#pinkGold)"
      />

      {/* Woman Silhouette (Abstracted) */}
      <path
        d="M 50 65 Q 40 45 42 25 Q 50 15 58 25 Q 60 45 50 65"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        opacity="0.9"
      />
      {/* Hair Flow */}
      <path
        d="M 58 25 Q 70 30 68 50 Q 65 65 75 70"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.9"
      />
    </motion.svg>
  );
};

export default BeautyLogo;
