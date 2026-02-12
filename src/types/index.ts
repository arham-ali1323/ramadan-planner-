export interface UserPreferences {
  familySize: number;
  ageGroups: string[];
  city: string;
  cookingTime: 'quick' | 'moderate' | 'extensive' | 'full';
  cuisineType: 'home' | 'continental' | 'chinese' | 'traditional' | 'punjabi' | 'sindhi' | 'mughlai' | 'karachi' | 'balochi';
  restrictions: string[];
  calorieTarget: 'low' | 'moderate' | 'high' | 'light';
  specialNeeds: string[];
  equipment: 'basic' | 'moderate' | 'advanced' | 'full';
  budget?: number;
  iftarTime?: string;
  suhoorTime?: string;
  specialRequirements?: string;
}

export interface Meal {
  name: string;
  description: string;
  nutrition: {
    calories: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
  ingredients: string[];
  cost: number;
  halal: boolean;
  traditional?: boolean;
  vegetarian?: boolean;
  spicy?: boolean;
  light?: boolean;
  cookingTime: 'quick' | 'moderate' | 'full';
  cuisine: string;
  equipment: 'basic' | 'moderate' | 'advanced' | 'full';
  healthTags: string[];
  regional: string[];
  instructions?: string[];
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  category?: 'iftar' | 'suhoor';
  difficulty?: 'easy' | 'medium' | 'hard';
  image?: string;
}

export interface DayPlan {
  day: number;
  date: string;
  iftar: Meal;
  suhoor: Meal;
  totalCost: number;
  totalCalories?: number;
}

export interface MealPlan {
  id: string;
  startDate: string;
  endDate: string;
  menu: DayPlan[];
  preferences: UserPreferences;
  totalCalories?: number;
  estimatedCost?: number;
  totalBudget?: number;
  shoppingList?: Record<string, Record<string, number>>;
}

export interface Recipe {
  name: string;
  description: string;
  nutrition: {
    calories: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
  ingredients: string[];
  cost: number;
  halal: boolean;
  traditional?: boolean;
  vegetarian?: boolean;
  spicy?: boolean;
  light?: boolean;
  cookingTime: 'quick' | 'moderate' | 'full';
  cuisine: string;
  equipment: 'basic' | 'moderate' | 'advanced' | 'full';
  healthTags: string[];
  regional: string[];
  instructions?: string[];
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  category?: 'iftar' | 'suhoor';
  difficulty?: 'easy' | 'medium' | 'hard';
  image?: string;
}

export interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

export interface ShoppingItem {
  ingredient: string;
  amount: string;
  unit: string;
  checked: boolean;
}
