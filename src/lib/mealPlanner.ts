import { Recipe, UserPreferences, DayPlan, MealPlan } from '@/types';
import { pakistaniRecipes } from '@/data/recipes';

export class MealPlannerService {
  private responseDelay = 2000; // 2 second delay to simulate API call

  async generateMealPlan(preferences: UserPreferences): Promise<MealPlan> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mealPlan = this.createRamadanMenu(preferences);
        resolve(mealPlan);
      }, this.responseDelay);
    });
  }

  private createRamadanMenu(preferences: UserPreferences): MealPlan {
    const { familySize, budget } = preferences;
    
    // Filter recipes based on preferences
    const filteredSuhoor = this.filterRecipes(pakistaniRecipes.suhoor, preferences);
    const filteredIftar = this.filterRecipes(pakistaniRecipes.iftar, preferences);

    const menu: DayPlan[] = [];
    for (let day = 1; day <= 30; day++) {
      const suhoor = this.getRandomMeal(filteredSuhoor, budget / 2);
      const iftar = this.getRandomMeal(filteredIftar, budget / 2);
      
      menu.push({
        day,
        suhoor: this.scaleRecipe(suhoor, familySize, preferences.ageGroups, preferences.specialNeeds),
        iftar: this.scaleRecipe(iftar, familySize, preferences.ageGroups, preferences.specialNeeds),
        totalCost: (suhoor.cost * familySize) + (iftar.cost * familySize)
      });
    }

    const totalBudget = budget * 30;
    const estimatedCost = menu.reduce((sum, day) => sum + day.totalCost, 0);
    const shoppingList = this.generateShoppingList(menu);

    return {
      preferences,
      menu,
      totalBudget,
      estimatedCost,
      shoppingList
    };
  }

  private filterRecipes(recipes: Recipe[], preferences: UserPreferences): Recipe[] {
    const { cookingTime, cuisineType, restrictions, calorieTarget, specialNeeds, equipment, city } = preferences;
    
    return recipes.filter(recipe => {
      // Cooking time filter
      if (cookingTime && recipe.cookingTime !== cookingTime && cookingTime !== 'full') {
        if (cookingTime === 'quick' && recipe.cookingTime !== 'quick') return false;
        if (cookingTime === 'moderate' && recipe.cookingTime === 'full') return false;
      }
      
      // Cuisine type filter
      if (cuisineType && recipe.cuisine !== cuisineType && cuisineType !== 'home') {
        if (cuisineType === 'punjabi' && !recipe.cuisine.includes('punjabi')) return false;
        if (cuisineType === 'sindhi' && !recipe.cuisine.includes('sindhi')) return false;
        if (cuisineType === 'mughlai' && !recipe.cuisine.includes('mughlai')) return false;
        if (cuisineType === 'karachi' && !recipe.cuisine.includes('karachi')) return false;
      }
      
      // Dietary restrictions filter
      if (restrictions && restrictions.length > 0) {
        if (restrictions.includes('vegetarian') && !recipe.vegetarian) return false;
        if (restrictions.includes('diabetic') && !recipe.healthTags.includes('diabetic')) {
          if (recipe.nutrition.calories > 400) return false;
        }
        if (restrictions.includes('lowcarb') && recipe.nutrition.carbs > 30) return false;
        if (restrictions.includes('highprotein') && recipe.nutrition.protein < 20) return false;
        if (restrictions.includes('nobeef') && recipe.ingredients.some(ing => ing.toLowerCase().includes('beef'))) return false;
        if (restrictions.includes('nomutton') && recipe.ingredients.some(ing => ing.toLowerCase().includes('mutton'))) return false;
      }
      
      // Calorie target filter
      if (calorieTarget) {
        if (calorieTarget === 'light' && recipe.nutrition.calories > 400) return false;
        if (calorieTarget === 'moderate' && (recipe.nutrition.calories < 300 || recipe.nutrition.calories > 600)) return false;
        if (calorieTarget === 'high' && recipe.nutrition.calories < 500) return false;
      }
      
      // Special needs filter
      if (specialNeeds && specialNeeds.length > 0) {
        if (specialNeeds.includes('elderly') && recipe.cookingTime === 'full') return false;
        if (specialNeeds.includes('athletes') && recipe.nutrition.protein < 25) return false;
        if (specialNeeds.includes('pregnancy') && recipe.nutrition.protein < 20) return false;
      }
      
      // Equipment filter
      if (equipment && equipment !== 'full') {
        if (equipment === 'basic' && recipe.equipment !== 'basic') return false;
        if (equipment === 'moderate' && recipe.equipment === 'full') return false;
      }
      
      // Regional preference filter
      if (city && city !== 'other') {
        if (!recipe.regional.includes(city) && !recipe.regional.includes('all')) {
          // Check if city is in broader region
          const cityRegions: Record<string, string[]> = {
            'karachi': ['sindh', 'coastal'],
            'lahore': ['punjab'],
            'islamabad': ['punjab'],
            'peshawar': ['kpk'],
            'quetta': ['balochistan'],
            'multan': ['south_punjab'],
            'faisalabad': ['punjab']
          };
          
          const regions = cityRegions[city] || [];
          const hasRegionalMatch = regions.some(region => 
            recipe.regional.some(reg => reg.includes(region))
          );
          
          if (!hasRegionalMatch) return false;
        }
      }
      
      return true;
    });
  }

  private getRandomMeal(recipes: Recipe[], maxCost: number): Recipe {
    const affordableRecipes = recipes.filter(recipe => recipe.cost <= maxCost);
    if (affordableRecipes.length === 0) {
      return recipes[Math.floor(Math.random() * recipes.length)];
    }
    return affordableRecipes[Math.floor(Math.random() * affordableRecipes.length)];
  }

  private scaleRecipe(recipe: Recipe, familySize: number, ageGroups: string[] = [], specialNeeds: string[] = []): Recipe {
    let scaleFactor = familySize;
    
    // Adjust portions based on age groups
    if (ageGroups.includes('kids')) {
      scaleFactor = Math.max(2, scaleFactor - 0.5); // Kids eat less
    }
    if (ageGroups.includes('elders')) {
      scaleFactor = Math.max(2, scaleFactor - 0.3); // Elders eat moderate portions
    }
    if (ageGroups.includes('athletes')) {
      scaleFactor += 0.5; // Athletes need more food
    }
    
    // Adjust nutrition for special needs
    let nutritionMultiplier = 1;
    if (specialNeeds.includes('pregnancy')) {
      nutritionMultiplier = 1.3; // 30% more nutrition
    }
    if (specialNeeds.includes('athletes')) {
      nutritionMultiplier = 1.4; // 40% more protein-focused nutrition
    }
    
    return {
      ...recipe,
      nutrition: {
        calories: Math.round(recipe.nutrition.calories * scaleFactor * nutritionMultiplier),
        protein: Math.round(recipe.nutrition.protein * scaleFactor * nutritionMultiplier),
        carbs: Math.round(recipe.nutrition.carbs * scaleFactor),
        fat: Math.round(recipe.nutrition.fat * scaleFactor)
      },
      cost: Math.round(recipe.cost * scaleFactor)
    };
  }

  private generateShoppingList(menu: DayPlan[]): Record<string, Record<string, number>> {
    const ingredients: Record<string, number> = {};
    
    menu.forEach(day => {
      [...day.suhoor.ingredients, ...day.iftar.ingredients].forEach(ingredient => {
        if (!ingredients[ingredient]) {
          ingredients[ingredient] = 0;
        }
        ingredients[ingredient]++;
      });
    });

    return this.categorizeIngredients(ingredients);
  }

  private categorizeIngredients(ingredients: Record<string, number>): Record<string, Record<string, number>> {
    const categories: Record<string, Record<string, number>> = {
      'Meat & Poultry': {},
      'Vegetables': {},
      'Dairy & Eggs': {},
      'Grains & Flours': {},
      'Spices & Condiments': {},
      'Other': {}
    };
    
    const meatItems = ['Beef', 'Chicken', 'Meat', 'Minced Meat', 'Fish'];
    const vegetableItems = ['Potatoes', 'Onions', 'Tomatoes', 'Garlic', 'Ginger', 'Mixed Vegetables', 'Peas', 'Lemon'];
    const dairyItems = ['Yogurt', 'Eggs', 'Ghee', 'Coconut'];
    const grainItems = ['Rice', 'Flour', 'Wheat', 'Lentils', 'Muesli'];
    const spiceItems = ['Spices', 'Herbs', 'Curry Leaves'];
    
    Object.entries(ingredients).forEach(([ingredient, count]) => {
      if (meatItems.some(item => ingredient.includes(item))) {
        categories['Meat & Poultry'][ingredient] = count;
      } else if (vegetableItems.some(item => ingredient.includes(item))) {
        categories['Vegetables'][ingredient] = count;
      } else if (dairyItems.some(item => ingredient.includes(item))) {
        categories['Dairy & Eggs'][ingredient] = count;
      } else if (grainItems.some(item => ingredient.includes(item))) {
        categories['Grains & Flours'][ingredient] = count;
      } else if (spiceItems.some(item => ingredient.includes(item))) {
        categories['Spices & Condiments'][ingredient] = count;
      } else {
        categories['Other'][ingredient] = count;
      }
    });
    
    return categories;
  }
}
