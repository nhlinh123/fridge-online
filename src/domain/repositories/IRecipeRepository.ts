import type { Recipe } from '../entities/Recipe';

export interface IRecipeRepository {
  findAll(): Promise<Recipe[]>;
  save(recipe: Recipe): Promise<Recipe>;
}
