import type { Unit } from '../ingredient/Ingredient';

export interface RecipeItem {
  ingredientRef: string;
  amount: number;
  unit: Unit;
  optional?: boolean;
}

export interface Recipe {
  id: string;
  name: string;
  description?: string;
  servings: number;
  cookTimeMinutes: number;
  items: RecipeItem[];
  tags: string[];
  steps: string[];
  createdAt: Date;
  updatedAt: Date;
}
