import React from 'react';
import { motion } from 'framer-motion';

const InputField = ({ label, icon: Icon, type = "text", name, value, onChange, placeholder, required = true, maxLength, pattern, inputMode }) => {
  return (
    <div className="relative mb-6">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10 text-brand-pink dark:text-brand-pink-light">
          {Icon && <Icon size={20} />}
        </div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          maxLength={maxLength}
          pattern={pattern}
          inputMode={inputMode}
          className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent transition-all duration-300 backdrop-blur-sm"
        />
      </div>
    </div>
  );
};

export default InputField;
