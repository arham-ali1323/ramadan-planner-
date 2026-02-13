'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPreferences } from '@/types';
import GlassCard from '@/components/ui/GlassCard';

interface PreferencesFormProps {
  onSubmit: (preferences: UserPreferences) => void;
  loading: boolean;
}

export default function PreferencesForm({ onSubmit, loading }: PreferencesFormProps) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(preferences);
  };

  const updatePreferences = (key: keyof UserPreferences, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayValue = (key: keyof UserPreferences, value: string) => {
    const currentArray = preferences[key] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updatePreferences(key, newArray);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <GlassCard className="p-8">
        <h3 className="text-2xl font-bold text-yellow-400 mb-6 border-b border-yellow-400/30 pb-3">
          1. Basic Information
        </h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider">
              Family Size
            </label>
            <select
              value={preferences.familySize}
              onChange={(e) => updatePreferences('familySize', parseInt(e.target.value))}
              className="w-full px-4 py-3 bg-white/5 border border-yellow-400/20 rounded-xl 
                       text-white focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50
                       backdrop-blur-sm transition-all appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23fbbf24' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 0.5rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em'
              }}
            >
              <option value="2" className="bg-gray-900 text-white">2 members</option>
              <option value="4" className="bg-gray-900 text-white">4 members</option>
              <option value="6" className="bg-gray-900 text-white">6 members</option>
              <option value="8" className="bg-gray-900 text-white">8 members</option>
              <option value="10" className="bg-gray-900 text-white">10+ members</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3 uppercase tracking-wider">
              Age Groups
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { value: 'kids', label: 'Kids (2-12 years)' },
                { value: 'adults', label: 'Adults (13-60 years)' },
                { value: 'elders', label: 'Elders (60+ years)' }
              ].map(({ value, label }) => (
                <label
                  key={value}
                  className="flex items-center p-3 bg-white/5 border border-yellow-400/20 rounded-lg 
                         cursor-pointer hover:bg-yellow-400/10 hover:border-yellow-400/40 transition-all"
                >
                  <input
                    type="checkbox"
                    checked={preferences.ageGroups.includes(value)}
                    onChange={() => toggleArrayValue('ageGroups', value)}
                    className="mr-3 text-yellow-400 focus:ring-yellow-400"
                  />
                  <span className="text-gray-300">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider">
              City/Location
            </label>
            <select
              value={preferences.city}
              onChange={(e) => updatePreferences('city', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-yellow-400/20 rounded-xl 
                       text-white focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50
                       backdrop-blur-sm transition-all appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23fbbf24' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 0.5rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em'
              }}
            >
              <option value="karachi" className="bg-gray-900 text-white">Karachi</option>
              <option value="lahore" className="bg-gray-900 text-white">Lahore</option>
              <option value="islamabad" className="bg-gray-900 text-white">Islamabad</option>
              <option value="peshawar" className="bg-gray-900 text-white">Peshawar</option>
              <option value="quetta" className="bg-gray-900 text-white">Quetta</option>
              <option value="multan" className="bg-gray-900 text-white">Multan</option>
              <option value="faisalabad" className="bg-gray-900 text-white">Faisalabad</option>
              <option value="other" className="bg-gray-900 text-white">Other</option>
            </select>
          </div>
        </div>
      </GlassCard>

      {/* Budget & Time */}
      <GlassCard className="p-8">
        <h3 className="text-2xl font-bold text-yellow-400 mb-6 border-b border-yellow-400/30 pb-3">
          2. Budget & Cooking Time
        </h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider">
              Daily Budget Range
            </label>
            <select
              value={preferences.budget}
              onChange={(e) => updatePreferences('budget', parseInt(e.target.value))}
              className="w-full px-4 py-3 bg-white/5 border border-yellow-400/20 rounded-xl 
                       text-white focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50
                       backdrop-blur-sm transition-all appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23fbbf24' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 0.5rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em'
              }}
            >
              <option value="1000" className="bg-gray-900 text-white">Budget (PKR 1,000-1,500)</option>
              <option value="1500" className="bg-gray-900 text-white">Economy (PKR 1,500-2,000)</option>
              <option value="2500" className="bg-gray-900 text-white">Standard (PKR 2,500-3,500)</option>
              <option value="4000" className="bg-gray-900 text-white">Premium (PKR 4,000+)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider">
              Cooking Time Available
            </label>
            <select
              value={preferences.cookingTime}
              onChange={(e) => updatePreferences('cookingTime', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-yellow-400/20 rounded-xl 
                       text-white focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50
                       backdrop-blur-sm transition-all appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23fbbf24' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 0.5rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em'
              }}
            >
              <option value="quick" className="bg-gray-900 text-white">Quick (30 mins max)</option>
              <option value="moderate" className="bg-gray-900 text-white">Moderate (1-2 hours)</option>
              <option value="full" className="bg-gray-900 text-white">Full preparation (3+ hours)</option>
            </select>
          </div>
        </div>
      </GlassCard>

      {/* Dietary Preferences */}
      <GlassCard className="p-8">
        <h3 className="text-2xl font-bold text-yellow-400 mb-6 border-b border-yellow-400/30 pb-3">
          3. Dietary Preferences
        </h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider">
              Cuisine Type
            </label>
            <select
              value={preferences.cuisineType}
              onChange={(e) => updatePreferences('cuisineType', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-yellow-400/20 rounded-xl 
                       text-white focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50
                       backdrop-blur-sm transition-all appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23fbbf24' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 0.5rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em'
              }}
            >
              <option value="punjabi" className="bg-gray-900 text-white">Punjabi</option>
              <option value="sindhi" className="bg-gray-900 text-white">Sindhi</option>
              <option value="mughlai" className="bg-gray-900 text-white">Mughlai</option>
              <option value="karachi" className="bg-gray-900 text-white">Karachi-style</option>
              <option value="home" className="bg-gray-900 text-white">Simple Home-style</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3 uppercase tracking-wider">
              Dietary Restrictions
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { value: 'diabetic', label: 'Diabetic-friendly' },
                { value: 'lowcarb', label: 'Low-carb' },
                { value: 'highprotein', label: 'High-protein' },
                { value: 'vegetarian', label: 'Vegetarian' },
                { value: 'nobeef', label: 'No beef' },
                { value: 'nomutton', label: 'No mutton' }
              ].map(({ value, label }) => (
                <label
                  key={value}
                  className="flex items-center p-3 bg-white/5 border border-yellow-400/20 rounded-lg 
                         cursor-pointer hover:bg-yellow-400/10 hover:border-yellow-400/40 transition-all"
                >
                  <input
                    type="checkbox"
                    checked={preferences.restrictions.includes(value)}
                    onChange={() => toggleArrayValue('restrictions', value)}
                    className="mr-3 text-yellow-400 focus:ring-yellow-400"
                  />
                  <span className="text-gray-300">{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Health & Nutrition */}
      <GlassCard className="p-8">
        <h3 className="text-2xl font-bold text-yellow-400 mb-6 border-b border-yellow-400/30 pb-3">
          4. Health & Nutrition
        </h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider">
              Calorie Target
            </label>
            <select
              value={preferences.calorieTarget}
              onChange={(e) => updatePreferences('calorieTarget', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-yellow-400/20 rounded-xl 
                       text-white focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50
                       backdrop-blur-sm transition-all appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23fbbf24' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 0.5rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em'
              }}
            >
              <option value="light" className="bg-gray-900 text-white">Light (300-400 cal per meal)</option>
              <option value="moderate" className="bg-gray-900 text-white">Moderate (400-600 cal per meal)</option>
              <option value="high" className="bg-gray-900 text-white">High-energy (600+ cal per meal)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3 uppercase tracking-wider">
              Special Needs
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { value: 'pregnancy', label: 'Pregnancy/Breastfeeding' },
                { value: 'elderly', label: 'Elderly (soft food)' },
                { value: 'kids', label: 'Kids (attractive presentation)' },
                { value: 'athletes', label: 'Athletes (high protein)' }
              ].map(({ value, label }) => (
                <label
                  key={value}
                  className="flex items-center p-3 bg-white/5 border border-yellow-400/20 rounded-lg 
                         cursor-pointer hover:bg-yellow-400/10 hover:border-yellow-400/40 transition-all"
                >
                  <input
                    type="checkbox"
                    checked={preferences.specialNeeds.includes(value)}
                    onChange={() => toggleArrayValue('specialNeeds', value)}
                    className="mr-3 text-yellow-400 focus:ring-yellow-400"
                  />
                  <span className="text-gray-300">{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Equipment Available */}
      <GlassCard className="p-8">
        <h3 className="text-2xl font-bold text-yellow-400 mb-6 border-b border-yellow-400/30 pb-3">
          5. Kitchen Equipment
        </h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider">
            Equipment Available
          </label>
          <select
            value={preferences.equipment}
            onChange={(e) => updatePreferences('equipment', e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-yellow-400/20 rounded-xl 
                     text-white focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50
                     backdrop-blur-sm transition-all appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23fbbf24' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 0.5rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em'
            }}
          >
            <option value="basic" className="bg-gray-900 text-white">Basic (stove + pan)</option>
            <option value="moderate" className="bg-gray-900 text-white">Moderate (oven, blender)</option>
            <option value="full" className="bg-gray-900 text-white">Full kitchen (air fryer, slow cooker, etc.)</option>
          </select>
        </div>
      </GlassCard>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 
                 font-bold text-lg rounded-xl shadow-lg shadow-yellow-400/30
                 hover:shadow-xl hover:shadow-yellow-400/50 hover:translate-y-[-2px]
                 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                 uppercase tracking-wider"
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
      >
        {loading ? 'Generating Your Ramadan Menu...' : 'Generate Ramadan Menu'}
      </motion.button>
    </form>
  );
}
