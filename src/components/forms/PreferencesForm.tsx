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
                       backdrop-blur-sm transition-all"
            >
              <option value="2">2 members</option>
              <option value="4">4 members</option>
              <option value="6">6 members</option>
              <option value="8">8 members</option>
              <option value="10">10+ members</option>
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
                       backdrop-blur-sm transition-all"
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
                       backdrop-blur-sm transition-all"
            >
              <option value="1500">Economy (PKR 1,500-2,000)</option>
              <option value="2500">Standard (PKR 2,500-3,500)</option>
              <option value="4000">Premium (PKR 4,000+)</option>
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
                       backdrop-blur-sm transition-all"
            >
              <option value="quick">Quick (30 mins max)</option>
              <option value="moderate">Moderate (1-2 hours)</option>
              <option value="full">Full preparation (3+ hours)</option>
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
                       backdrop-blur-sm transition-all"
            >
              <option value="punjabi">Punjabi</option>
              <option value="sindhi">Sindhi</option>
              <option value="mughlai">Mughlai</option>
              <option value="karachi">Karachi-style</option>
              <option value="home">Simple Home-style</option>
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
                       backdrop-blur-sm transition-all"
            >
              <option value="light">Light (300-400 cal per meal)</option>
              <option value="moderate">Moderate (400-600 cal per meal)</option>
              <option value="high">High-energy (600+ cal per meal)</option>
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
                     backdrop-blur-sm transition-all"
          >
            <option value="basic">Basic (stove + pan)</option>
            <option value="moderate">Moderate (oven, blender)</option>
            <option value="full">Full kitchen (air fryer, slow cooker, etc.)</option>
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
