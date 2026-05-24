export interface RecipeIngredient {
  ingredientName: string;
  optional?: boolean;
}

export interface Recipe {
  id: string;
  name: string;
  servings: number;
  cookTimeMinutes: number;
  ingredients: RecipeIngredient[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
