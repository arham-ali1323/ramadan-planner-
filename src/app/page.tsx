'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPreferences, MealPlan } from '@/types';
import { MealPlannerService } from '@/lib/mealPlanner';
import PreferencesForm from '@/components/forms/PreferencesForm';
import MealPlanDisplay from '@/components/results/MealPlanDisplay';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ParticleBackground from '@/components/ui/ParticleBackground';
import GlassCard from '@/components/ui/GlassCard';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const mealPlannerService = new MealPlannerService();

  const handleFormSubmit = async (preferences: UserPreferences) => {
    setLoading(true);
    try {
      const plan = await mealPlannerService.generateMealPlan(preferences);
      setMealPlan(plan);
    } catch (error) {
      console.error('Error generating meal plan:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 relative overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Golden Overlay */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-transparent to-yellow-400/5" />
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/5 via-transparent to-yellow-400/10" />
      </div>

      {/* Content */}
      <div className="relative z-20">
        {/* Header */}
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-blue-900/90 backdrop-blur-xl border-b border-yellow-400/20" />
          <div className="relative container mx-auto px-6 py-16 text-center">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-4 flex flex-col md:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-yellow-400">🌙</span>
              <span className="bg-gradient-to-r from-white via-yellow-400 to-white bg-clip-text text-transparent">
                Ramadan Iftar/Suhoor Planner
              </span>
              <span className="text-yellow-400">⭐</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Plan your perfect Ramadan meals with authentic Pakistani recipes
            </motion.p>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-12">
          {!mealPlan && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <GlassCard className="p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">
                  Family Preferences & Requirements
                </h2>
                <PreferencesForm onSubmit={handleFormSubmit} loading={loading} />
              </GlassCard>
            </motion.div>
          )}

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <GlassCard className="p-12">
                <LoadingSpinner />
              </GlassCard>
            </motion.div>
          )}

          {mealPlan && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <MealPlanDisplay mealPlan={mealPlan} />
              
              <div className="mt-8 text-center">
                <button
                  onClick={() => setMealPlan(null)}
                  className="px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-800 text-yellow-400 
                           font-semibold rounded-xl shadow-lg shadow-gray-700/30
                           hover:shadow-xl hover:shadow-gray-700/50 hover:translate-y-[-2px]
                           transition-all duration-300"
                >
                  Generate New Menu
                </button>
              </div>
            </motion.div>
          )}
        </main>

        {/* Footer */}
        <footer className="relative mt-20 border-t border-yellow-400/20">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent backdrop-blur-xl" />
          <div className="relative container mx-auto px-6 py-8 text-center">
            <p className="text-gray-400">
              © 2026 Ramadan Planner. Made with ❤️ for the Muslim community.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
