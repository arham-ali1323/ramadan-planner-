'use client';

import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center p-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-16 h-16 border-4 border-yellow-400/20 border-t-yellow-400 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <p className="mt-6 text-gray-300 text-lg font-light">Generating your personalized Ramadan menu...</p>
    </motion.div>
  );
}
