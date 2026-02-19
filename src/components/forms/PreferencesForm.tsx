'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPreferences } from '@/types';
import { useTheme } from '@/contexts/ThemeContext';
import GlassCard from '@/components/ui/GlassCard';

interface PreferencesFormProps {
  onSubmit: (preferences: UserPreferences) => void;
  loading: boolean;
}

export default function PreferencesForm({ onSubmit, loading }: PreferencesFormProps) {
  const { theme } = useTheme();
  const [preferences, setPreferences] = useState<UserPreferences>({
    familySize: 4,
    budget: 2500,
    ageGroups: ['adults'],
    city: 'karachi',
    cookingTime: 'moderate',
    cuisineType: 'home',
    restrictions: [],
    calorieTarget: 'moderate',
    specialNeeds: [],
    equipment: 'moderate'
  });

  const updatePreferences = (key: keyof UserPreferences, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(preferences);
  };

  const toggleArrayItem = (key: keyof UserPreferences, item: string) => {
    setPreferences(prev => ({
      ...prev,
      [key]: (prev[key] as string[]).includes(item)
        ? (prev[key] as string[]).filter(i => i !== item)
        : [...(prev[key] as string[]), item]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Family Information */}
      <div className="bg-green-900 dark:bg-gray-800/50 rounded-xl p-6 backdrop-blur-xl border border-green-700 dark:border-yellow-400/20">
        <h3 className="text-lg font-semibold text-green-100 dark:text-white mb-4 pb-2 border-b border-green-700 dark:border-yellow-400/20">
          Family Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-green-200 dark:text-gray-300 mb-2">
              Family Size
            </label>
            <select
              value={preferences.familySize}
              onChange={(e) => updatePreferences('familySize', parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-yellow-400/30 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-yellow-400 focus:border-emerald-500 dark:focus:border-yellow-400 bg-white dark:bg-gray-900/50 text-gray-900 dark:text-white"
            >
              <option value="2">2 members</option>
              <option value="4">4 members</option>
              <option value="6">6 members</option>
              <option value="8">8 members</option>
              <option value="10">10+ members</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-green-200 dark:text-gray-300 mb-2">
              City/Location
            </label>
            <select
              value={preferences.city}
              onChange={(e) => updatePreferences('city', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-yellow-400/30 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-yellow-400 focus:border-emerald-500 dark:focus:border-yellow-400 bg-white dark:bg-gray-900/50 text-gray-900 dark:text-white"
            >
              <option value="karachi">Karachi</option>
              <option value="lahore">Lahore</option>
              <option value="islamabad">Islamabad</option>
              <option value="peshawar">Peshawar</option>
              <option value="quetta">Quetta</option>
              <option value="multan">Multan</option>
              <option value="faisalabad">Faisalabad</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Budget & Time */}
      <div className="bg-green-900 dark:bg-gray-800/50 rounded-xl p-6 backdrop-blur-xl border border-green-700 dark:border-yellow-400/20">
        <h3 className="text-lg font-semibold text-green-100 dark:text-white mb-4 pb-2 border-b border-green-700 dark:border-yellow-400/20">
          Budget & Cooking Time
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-green-200 dark:text-gray-300 mb-2">
              Daily Budget Range
            </label>
            <select
              value={preferences.budget}
              onChange={(e) => updatePreferences('budget', parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-yellow-400/30 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-yellow-400 focus:border-emerald-500 dark:focus:border-yellow-400 bg-white dark:bg-gray-900/50 text-gray-900 dark:text-white"
            >
              <option value="1000">Budget (PKR 1,000-1,500)</option>
              <option value="1500">Economy (PKR 1,500-2,000)</option>
              <option value="2500">Standard (PKR 2,500-3,500)</option>
              <option value="4000">Premium (PKR 4,000+)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-green-200 dark:text-gray-300 mb-2">
              Cooking Time Available
            </label>
            <select
              value={preferences.cookingTime}
              onChange={(e) => updatePreferences('cookingTime', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-yellow-400/30 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-yellow-400 focus:border-emerald-500 dark:focus:border-yellow-400 bg-white dark:bg-gray-900/50 text-gray-900 dark:text-white"
            >
              <option value="quick">Quick (30 mins max)</option>
              <option value="moderate">Moderate (1-2 hours)</option>
              <option value="full">Full preparation (3+ hours)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Dietary Preferences */}
      <div className="bg-green-900 dark:bg-gray-800/50 rounded-xl p-6 backdrop-blur-xl border border-green-700 dark:border-yellow-400/20">
        <h3 className="text-lg font-semibold text-green-100 dark:text-white mb-4 pb-2 border-b border-green-700 dark:border-yellow-400/20">
          Dietary Preferences
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-green-200 dark:text-gray-300 mb-2">
              Cuisine Type
            </label>
            <select
              value={preferences.cuisineType}
              onChange={(e) => updatePreferences('cuisineType', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-yellow-400/30 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-yellow-400 focus:border-emerald-500 dark:focus:border-yellow-400 bg-white dark:bg-gray-900/50 text-gray-900 dark:text-white"
            >
              <option value="punjabi">Punjabi</option>
              <option value="sindhi">Sindhi</option>
              <option value="mughlai">Mughlai</option>
              <option value="karachi">Karachi-style</option>
              <option value="home">Simple Home-style</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Dietary Restrictions
            </label>
            <div className="space-y-2">
              {[
                { value: 'diabetic', label: 'Diabetic-friendly' },
                { value: 'lowcarb', label: 'Low-carb' },
                { value: 'highprotein', label: 'High-protein' },
                { value: 'vegetarian', label: 'Vegetarian' }
              ].map(({ value, label }) => (
                <label key={value} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.restrictions.includes(value)}
                    onChange={() => toggleArrayItem('restrictions', value)}
                    className="mr-2 rounded border-gray-300 dark:border-yellow-400/30 text-emerald-600 dark:text-yellow-400 focus:ring-emerald-500 dark:focus:ring-yellow-400 bg-white dark:bg-gray-900/50"
                  />
                  <span className="text-green-200 dark:text-gray-300">{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Health & Special Requirements */}
      <div className="bg-green-900 dark:bg-gray-800/50 rounded-xl p-6 backdrop-blur-xl border border-green-700 dark:border-yellow-400/20">
        <h3 className="text-lg font-semibold text-green-100 dark:text-white mb-4 pb-2 border-b border-green-700 dark:border-yellow-400/20">
          Health & Special Requirements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-green-200 dark:text-gray-300 mb-2">
              Calorie Target
            </label>
            <select
              value={preferences.calorieTarget}
              onChange={(e) => updatePreferences('calorieTarget', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-yellow-400/30 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-yellow-400 focus:border-emerald-500 dark:focus:border-yellow-400 bg-white dark:bg-gray-900/50 text-gray-900 dark:text-white"
            >
              <option value="light">Light (300-400 cal per meal)</option>
              <option value="moderate">Moderate (400-600 cal per meal)</option>
              <option value="high">High-energy (600+ cal per meal)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Special Needs
            </label>
            <div className="space-y-2">
              {[
                { value: 'pregnancy', label: 'Pregnancy/Breastfeeding' },
                { value: 'athletes', label: 'Athletes' },
                { value: 'elderly', label: 'Elderly' },
                { value: 'children', label: 'Children' }
              ].map(({ value, label }) => (
                <label key={value} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.specialNeeds.includes(value)}
                    onChange={() => toggleArrayItem('specialNeeds', value)}
                    className="mr-2 rounded border-gray-300 dark:border-yellow-400/30 text-emerald-600 dark:text-yellow-400 focus:ring-emerald-500 dark:focus:ring-yellow-400 bg-white dark:bg-gray-900/50"
                  />
                  <span className="text-green-200 dark:text-gray-300">{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Kitchen Equipment */}
      <div className="bg-green-900 dark:bg-gray-800/50 rounded-xl p-6 backdrop-blur-xl border border-green-700 dark:border-yellow-400/20">
        <h3 className="text-lg font-semibold text-green-100 dark:text-white mb-4 pb-2 border-b border-green-700 dark:border-yellow-400/20">
          Kitchen Equipment
        </h3>
        
        <div>
          <label className="block text-sm font-medium text-green-200 dark:text-gray-300 mb-2">
            Equipment Available
          </label>
          <select
            value={preferences.equipment}
            onChange={(e) => updatePreferences('equipment', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-yellow-400/30 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-yellow-400 focus:border-emerald-500 dark:focus:border-yellow-400 bg-white dark:bg-gray-900/50 text-gray-900 dark:text-white"
          >
            <option value="basic">Basic (stove + pan)</option>
            <option value="moderate">Moderate (oven, blender)</option>
            <option value="full">Full kitchen (air fryer, slow cooker, etc.)</option>
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={loading}
        className={`w-full py-3 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
          theme === 'dark'
            ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-500'
            : 'bg-green-600 text-white hover:bg-green-700'
        }`}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
      >
        {loading ? 'Creating your plan...' : 'Generate Ramadan Meal Plan'}
      </motion.button>
    </form>
  );
}
