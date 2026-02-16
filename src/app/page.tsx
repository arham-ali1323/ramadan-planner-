'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPreferences, MealPlan } from '@/types';
import { MealPlannerService } from '@/lib/mealPlanner';
import PreferencesForm from '@/components/forms/PreferencesForm';
import MealPlanDisplay from '@/components/results/MealPlanDisplay';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';

function HomeContent() {
  const [loading, setLoading] = useState(false);
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const { theme } = useTheme();
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
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900' 
        : 'bg-gradient-to-br from-green-900 via-green-950 to-black'
    }`}>
      {/* Subtle pattern overlay */}
      <div className="fixed inset-0 opacity-30 dark:opacity-20">
        <div className="absolute inset-0 dark:hidden" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="absolute inset-0 hidden dark:block" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fbbf24' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Content */}
      <div className="relative">
        {/* Header */}
        <header className={`${
          theme === 'dark' 
            ? 'bg-gray-900/80 border-yellow-400/20' 
            : 'bg-green-950/80 border-green-800'
        } backdrop-blur-sm border-b shadow-sm`}>
          <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center">
              <div className="text-center flex-1">
                <h1 className={`text-4xl md:text-5xl font-bold mb-3 ${
                  theme === 'dark' ? 'text-white' : 'text-green-100'
                }`}>
                  Ramadan Meal Planner
                </h1>
                <p className={`text-lg max-w-2xl mx-auto ${
                  theme === 'dark' ? 'text-gray-300' : 'text-green-200'
                }`}>
                  Create personalized suhoor and iftar meal plans for your family
                </p>
              </div>
              <div className="ml-4">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-12">
          {!mealPlan && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="max-w-4xl mx-auto">
                <div className={`${
                  theme === 'dark'
                    ? 'bg-gray-800/50 border-yellow-400/20 shadow-yellow-400/20'
                    : 'bg-green-900 border-green-700 shadow-green-950/50'
                } rounded-2xl p-8 md:p-12 backdrop-blur-xl border`}>
                  <div className="mb-8">
                    <h2 className={`text-2xl font-semibold mb-2 ${
                      theme === 'dark' ? 'text-white' : 'text-green-100'
                    }`}>
                      Family Preferences
                    </h2>
                    <p className={theme === 'dark' ? 'text-gray-300' : 'text-green-200'}>
                      Tell us about your family to get personalized meal recommendations
                    </p>
                  </div>
                  <PreferencesForm onSubmit={handleFormSubmit} loading={loading} />
                </div>
              </div>
            </motion.div>
          )}

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-lg dark:shadow-yellow-400/20 border border-gray-200 dark:border-yellow-400/20 p-16 text-center">
                  <LoadingSpinner />
                  <p className="mt-4 text-gray-600 dark:text-gray-300">Creating your personalized meal plan...</p>
                </div>
              </div>
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
                  className="px-6 py-3 bg-emerald-600 dark:bg-yellow-400 text-white dark:text-gray-900 font-medium rounded-lg shadow-md hover:bg-emerald-700 dark:hover:bg-yellow-500 hover:shadow-lg transition-all duration-200"
                >
                  Create New Plan
                </button>
              </div>
            </motion.div>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-gray-50 dark:bg-gray-900/90 border-t border-gray-200 dark:border-yellow-400/20 mt-20">
          <div className="container mx-auto px-6 py-8">
            <div className="text-center text-gray-600 dark:text-gray-300">
              <p className="mb-2">
                © 2026 Ramadan Meal Planner. Made with care for Muslim families.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Plan your Ramadan meals with authentic Pakistani recipes
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <HomeContent />
    </ThemeProvider>
  );
}
