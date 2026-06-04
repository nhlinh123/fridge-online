import type { Recipe } from './Recipe';

export interface IRecipeRepo {
  findById(id: string): Promise<Recipe | null>;
  findAll(): Promise<Recipe[]>;
  save(recipe: Recipe): Promise<void>;
  delete(id: string): Promise<void>;
}
