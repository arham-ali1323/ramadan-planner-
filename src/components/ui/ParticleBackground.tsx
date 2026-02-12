'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  type: 'star' | 'moon';
  animationDelay: number;
  animationDuration: number;
}

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const particleCount = 50;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        type: Math.random() > 0.5 ? 'moon' : 'star',
        animationDelay: Math.random() * 6,
        animationDuration: Math.random() * 3 + 4
      });
    }

    particlesRef.current = particles;

    // Animate particles gently
    const interval = setInterval(() => {
      particlesRef.current.forEach((particle, index) => {
        const element = document.getElementById(`particle-${particle.id}`);
        if (element) {
          const currentX = parseFloat(element.style.left) || particle.x;
          const currentY = parseFloat(element.style.top) || particle.y;
          
          const newX = currentX + (Math.random() - 0.5) * 0.1;
          const newY = currentY + (Math.random() - 0.5) * 0.1;
          
          element.style.left = Math.max(0, Math.min(100, newX)) + '%';
          element.style.top = Math.max(0, Math.min(100, newY)) + '%';
        }
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute inset-0" ref={containerRef}>
        {particlesRef.current.map((particle) => (
          <motion.div
            key={particle.id}
            id={`particle-${particle.id}`}
            className={`absolute ${particle.type === 'moon' ? 'bg-white' : 'bg-yellow-400'} rounded-full`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.animationDelay}s`,
              animationDuration: `${particle.animationDuration}s`
            }}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: particle.animationDuration,
              repeat: Infinity,
              delay: particle.animationDelay
            }}
          />
        ))}
      </div>
    </div>
  );
}
