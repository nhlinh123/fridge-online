import type { Ingredient } from '../entities/Ingredient';

export interface IIngredientRepository {
  findAll(): Promise<Ingredient[]>;
  save(ingredient: Ingredient): Promise<Ingredient>;
}
