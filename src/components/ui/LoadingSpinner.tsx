'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

export default function LoadingSpinner() {
  const { theme } = useTheme();

  return (
    <motion.div
      className="flex flex-col items-center justify-center p-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={`w-16 h-16 border-4 rounded-full ${
          theme === 'dark' 
            ? 'border-yellow-400/20 border-t-yellow-400' 
            : 'border-green-400/30 border-t-green-400'
        }`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <p className={`mt-6 text-lg font-light ${
        theme === 'dark' ? 'text-gray-300' : 'text-green-200'
      }`}>
        🌙 Preparing your Ramadan meal plan...
      </p>
    </motion.div>
  );
}
