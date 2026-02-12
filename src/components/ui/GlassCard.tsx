'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export default function GlassCard({ children, className = '', hover = true, glow = true }: GlassCardProps) {
  return (
    <motion.div
      className={`
        relative backdrop-blur-xl bg-white/5 border border-yellow-400/20 
        rounded-2xl overflow-hidden transition-all duration-300
        ${hover ? 'hover:translate-y-[-5px]' : ''}
        ${glow ? 'shadow-2xl shadow-yellow-400/20' : 'shadow-xl'}
        ${className}
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? {
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 50px rgba(251, 191, 36, 0.3)',
        borderColor: 'rgba(251, 191, 36, 0.5)'
      } : {}}
    >
      {/* Golden shimmer effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent animate-pulse" />
      </div>
      
      {/* Top golden line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-pulse" />
      
      {children}
    </motion.div>
  );
}
