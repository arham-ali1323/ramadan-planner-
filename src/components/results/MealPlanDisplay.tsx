'use client';

import { motion } from 'framer-motion';
import { DayPlan, MealPlan } from '@/types';
import { useState } from 'react';

interface MealPlanDisplayProps {
  mealPlan: MealPlan;
}

export default function MealPlanDisplay({ mealPlan }: MealPlanDisplayProps) {
  const [selectedDay, setSelectedDay] = useState<DayPlan | null>(null);

  const exportJSON = () => {
    const dataStr = JSON.stringify(mealPlan, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'ramadan-menu-plan.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const exportTXT = () => {
    let txtContent = 'RAMADAN IFTAR/SUHOOR MEAL PLAN\\n';
    txtContent += '================================\\n\\n';
    txtContent += `Family Size: ${mealPlan.preferences.familySize} people\\n`;
    txtContent += `Daily Budget: PKR ${mealPlan.preferences.budget}\\n`;
    txtContent += `Total Budget (30 days): PKR ${mealPlan.totalBudget}\\n\\n`;
    
    mealPlan.menu.forEach(day => {
      txtContent += `Day ${day.day}\\n`;
      txtContent += `--------\\n`;
      txtContent += `Suhoor: ${day.suhoor.name}\\n`;
      txtContent += `  - Calories: ${day.suhoor.nutrition.calories}\\n`;
      txtContent += `  - Cost: PKR ${day.suhoor.cost}\\n`;
      txtContent += `Iftar: ${day.iftar.name}\\n`;
      txtContent += `  - Calories: ${day.iftar.nutrition.calories}\\n`;
      txtContent += `  - Cost: PKR ${day.iftar.cost}\\n`;
      txtContent += `Daily Total: PKR ${day.totalCost}\\n\\n`;
    });
    
    const dataUri = 'data:text/plain;charset=utf-8,'+ encodeURIComponent(txtContent);
    const exportFileDefaultName = 'ramadan-menu-plan.txt';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header with Export Options */}
      <div className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-lg dark:shadow-yellow-400/20 border border-gray-200 dark:border-yellow-400/20 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Your Ramadan Meal Plan
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              30 days of personalized meals for {mealPlan.preferences.familySize} people
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportJSON}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
            >
              Export JSON
            </button>
            <button
              onClick={exportTXT}
              className="px-4 py-2 bg-emerald-600 dark:bg-yellow-400 text-white dark:text-gray-900 rounded-lg hover:bg-emerald-700 dark:hover:bg-yellow-500 transition-colors text-sm font-medium"
            >
              Export Plan
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-lg dark:shadow-yellow-400/20 border border-gray-200 dark:border-yellow-400/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Total Budget</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">PKR {mealPlan.totalBudget?.toLocaleString() || '0'}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 dark:bg-yellow-400/20 rounded-lg flex items-center justify-center">
              <span className="text-emerald-600 dark:text-yellow-400 text-xl">💰</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-lg dark:shadow-yellow-400/20 border border-gray-200 dark:border-yellow-400/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Estimated Cost</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">PKR {mealPlan.estimatedCost?.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-yellow-400/20 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 dark:text-yellow-400 text-xl">📊</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-lg dark:shadow-yellow-400/20 border border-gray-200 dark:border-yellow-400/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Days Planned</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{mealPlan.menu.length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-yellow-400/20 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 dark:text-yellow-400 text-xl">📅</span>
            </div>
          </div>
        </div>
      </div>

      {/* Meal Plan Days */}
      <div className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-lg dark:shadow-yellow-400/20 border border-gray-200 dark:border-yellow-400/20 p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Daily Meal Schedule</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mealPlan.menu.map((day, index) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="border border-gray-200 dark:border-yellow-400/30 rounded-lg p-4 hover:shadow-md dark:hover:shadow-yellow-400/20 transition-shadow cursor-pointer bg-white dark:bg-gray-800/50"
              onClick={() => setSelectedDay(day)}
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">Day {day.day}</h4>
                <span className="text-sm text-gray-500 dark:text-gray-400">{day.date}</span>
              </div>
              
              <div className="space-y-3">
                <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-lg p-3">
                  <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400 mb-1">SUHOOR</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{day.suhoor.name}</p>
                  <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-1">
                    <span>{day.suhoor.nutrition.calories} cal</span>
                    <span>PKR {day.suhoor.cost}</span>
                  </div>
                </div>
                
                <div className="bg-orange-50 dark:bg-orange-900/30 rounded-lg p-3">
                  <p className="text-xs font-medium text-orange-700 dark:text-orange-400 mb-1">IFTAR</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{day.iftar.name}</p>
                  <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-1">
                    <span>{day.iftar.nutrition.calories} cal</span>
                    <span>PKR {day.iftar.cost}</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-yellow-400/30 pt-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Daily Total</span>
                    <span className="font-semibold text-gray-900 dark:text-white">PKR {day.totalCost}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Shopping List */}
      {mealPlan.shoppingList && (
        <div className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-xl shadow-lg dark:shadow-yellow-400/20 border border-gray-200 dark:border-yellow-400/20 p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Shopping List</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(mealPlan.shoppingList).map(([category, items]) => (
              <div key={category} className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-200 dark:border-yellow-400/30">
                  {category}
                </h4>
                <div className="space-y-2">
                  {Object.entries(items).map(([ingredient, count]) => (
                    <div key={ingredient} className="flex justify-between text-sm">
                      <span className="text-gray-700 dark:text-gray-300">{ingredient}</span>
                      <span className="font-medium text-emerald-600 dark:text-yellow-400">{count}x</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Day Detail Modal */}
      {selectedDay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800/95 backdrop-blur-xl rounded-xl shadow-xl dark:shadow-yellow-400/30 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-yellow-400/30"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Day {selectedDay.day}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{selectedDay.date}</p>
                </div>
                <button
                  onClick={() => setSelectedDay(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-yellow-400 text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-lg p-6">
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-3">SUHOOR</h4>
                  <h5 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{selectedDay.suhoor.name}</h5>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{selectedDay.suhoor.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Calories:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{selectedDay.suhoor.nutrition.calories}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Protein:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{selectedDay.suhoor.nutrition.protein || 0}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Cost:</span>
                      <span className="font-medium text-gray-900 dark:text-white">PKR {selectedDay.suhoor.cost}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ingredients:</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedDay.suhoor.ingredients.map((ingredient, idx) => (
                        <span key={idx} className="px-2 py-1 bg-emerald-100 dark:bg-emerald-800/50 text-emerald-700 dark:text-emerald-400 text-xs rounded-full">
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/30 rounded-lg p-6">
                  <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-3">IFTAR</h4>
                  <h5 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{selectedDay.iftar.name}</h5>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{selectedDay.iftar.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Calories:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{selectedDay.iftar.nutrition.calories}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Protein:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{selectedDay.iftar.nutrition.protein || 0}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Cost:</span>
                      <span className="font-medium text-gray-900 dark:text-white">PKR {selectedDay.iftar.cost}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ingredients:</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedDay.iftar.ingredients.map((ingredient, idx) => (
                        <span key={idx} className="px-2 py-1 bg-orange-100 dark:bg-orange-800/50 text-orange-700 dark:text-orange-400 text-xs rounded-full">
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-yellow-400/30">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">Daily Total Cost</span>
                  <span className="text-xl font-bold text-emerald-600 dark:text-yellow-400">PKR {selectedDay.totalCost}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
