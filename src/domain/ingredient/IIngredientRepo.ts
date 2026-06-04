import type { Ingredient } from './Ingredient';

export interface IIngredientRepo {
  findById(id: string): Promise<Ingredient | null>;
  findAll(): Promise<Ingredient[]>;
  findByNormalizedName(nameNormalized: string): Promise<Ingredient | null>;
  save(ingredient: Ingredient): Promise<void>;
  delete(id: string): Promise<void>;
}
