'use client';

import { motion } from 'framer-motion';
import { DayPlan, MealPlan } from '@/types';
import GlassCard from '@/components/ui/GlassCard';
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <h2 className="text-3xl font-bold text-white">Your 30-Day Ramadan Menu</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={exportJSON}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-yellow-400 
                     font-semibold rounded-xl shadow-lg shadow-blue-600/30
                     hover:shadow-xl hover:shadow-blue-600/50 hover:translate-y-[-2px]
                     transition-all duration-300"
          >
            Export JSON
          </button>
          <button
            onClick={exportTXT}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-yellow-400 
                     font-semibold rounded-xl shadow-lg shadow-blue-600/30
                     hover:shadow-xl hover:shadow-blue-600/50 hover:translate-y-[-2px]
                     transition-all duration-300"
          >
            Export TXT
          </button>
        </div>
      </div>

      {/* Budget Overview */}
      <GlassCard className="p-8">
        <h3 className="text-2xl font-bold text-yellow-400 mb-6">Budget Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 p-6 rounded-xl border border-yellow-400/20">
            <div className="text-gray-400 text-sm font-medium mb-2">Daily Budget</div>
            <div className="text-2xl font-bold text-yellow-400">PKR {mealPlan.preferences.budget}</div>
          </div>
          <div className="bg-white/5 p-6 rounded-xl border border-yellow-400/20">
            <div className="text-gray-400 text-sm font-medium mb-2">Total Budget (30 days)</div>
            <div className="text-2xl font-bold text-yellow-400">PKR {mealPlan.totalBudget}</div>
          </div>
          <div className="bg-white/5 p-6 rounded-xl border border-yellow-400/20">
            <div className="text-gray-400 text-sm font-medium mb-2">Estimated Cost</div>
            <div className="text-2xl font-bold text-yellow-400">PKR {mealPlan.estimatedCost}</div>
          </div>
        </div>
      </GlassCard>

      {/* Menu Calendar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mealPlan.menu.map((day, index) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <GlassCard className="p-6 cursor-pointer" onClick={() => setSelectedDay(day)}>
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-yellow-400/20">
                <span className="text-xl font-bold text-yellow-400">Day {day.day}</span>
                <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 
                               text-xs font-bold rounded-full uppercase">
                  ✓ Halal
                </span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="text-gray-400 text-sm font-medium mb-2 flex items-center gap-2">
                    🌅 Suhoor
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg border border-yellow-400/10">
                    <div className="text-white font-medium">{day.suhoor.name}</div>
                    <div className="text-gray-400 text-sm mt-1">
                      {day.suhoor.nutrition.calories} cal | {day.suhoor.nutrition.protein}g protein
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="text-gray-400 text-sm font-medium mb-2 flex items-center gap-2">
                    🌙 Iftar
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg border border-yellow-400/10">
                    <div className="text-white font-medium">{day.iftar.name}</div>
                    <div className="text-gray-400 text-sm mt-1">
                      {day.iftar.nutrition.calories} cal | {day.iftar.nutrition.protein}g protein
                    </div>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-yellow-400/20">
                  <div className="text-gray-400 text-sm">Daily Cost</div>
                  <div className="text-yellow-400 font-bold">PKR {day.totalCost}</div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Shopping List */}
      <GlassCard className="p-8">
        <h3 className="text-2xl font-bold text-yellow-400 mb-6">Shopping List</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(mealPlan.shoppingList).map(([category, items]) => (
            <div key={category} className="bg-white/5 p-6 rounded-xl border border-yellow-400/20">
              <h4 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-yellow-400/20">
                {category}
              </h4>
              <div className="space-y-2">
                {Object.entries(items).map(([ingredient, count]) => (
                  <div key={ingredient} className="flex justify-between text-sm">
                    <span className="text-gray-300">{ingredient}</span>
                    <span className="text-yellow-400 font-medium">{count}x</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Day Detail Modal */}
      {selectedDay && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedDay(null)}
        >
          <motion.div
            className="bg-gray-900/90 backdrop-blur-xl border border-yellow-400/20 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-yellow-400">Day {selectedDay.day} Details</h3>
              <button
                onClick={() => setSelectedDay(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  🌅 Suhoor: {selectedDay.suhoor.name}
                </h4>
                <p className="text-gray-300 mb-3">{selectedDay.suhoor.description}</p>
                <div className="bg-white/5 p-4 rounded-lg border border-yellow-400/10">
                  <h5 className="text-yellow-400 font-medium mb-2">Nutrition</h5>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Calories: {selectedDay.suhoor.nutrition.calories}</div>
                    <div>Protein: {selectedDay.suhoor.nutrition.protein}g</div>
                    <div>Carbs: {selectedDay.suhoor.nutrition.carbs}g</div>
                    <div>Fat: {selectedDay.suhoor.nutrition.fat}g</div>
                  </div>
                </div>
                <div className="mt-3">
                  <h5 className="text-yellow-400 font-medium mb-2">Ingredients</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedDay.suhoor.ingredients.map((ingredient, index) => (
                      <span key={index} className="px-3 py-1 bg-white/10 text-gray-300 rounded-full text-sm">
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  🌙 Iftar: {selectedDay.iftar.name}
                </h4>
                <p className="text-gray-300 mb-3">{selectedDay.iftar.description}</p>
                <div className="bg-white/5 p-4 rounded-lg border border-yellow-400/10">
                  <h5 className="text-yellow-400 font-medium mb-2">Nutrition</h5>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Calories: {selectedDay.iftar.nutrition.calories}</div>
                    <div>Protein: {selectedDay.iftar.nutrition.protein}g</div>
                    <div>Carbs: {selectedDay.iftar.nutrition.carbs}g</div>
                    <div>Fat: {selectedDay.iftar.nutrition.fat}g</div>
                  </div>
                </div>
                <div className="mt-3">
                  <h5 className="text-yellow-400 font-medium mb-2">Ingredients</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedDay.iftar.ingredients.map((ingredient, index) => (
                      <span key={index} className="px-3 py-1 bg-white/10 text-gray-300 rounded-full text-sm">
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-yellow-400/20">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Daily Total Cost</span>
                  <span className="text-2xl font-bold text-yellow-400">PKR {selectedDay.totalCost}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
