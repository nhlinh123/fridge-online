import Dexie, { type EntityTable } from 'dexie';
import type { Ingredient } from '../../domain/entities/Ingredient';
import type { Recipe } from '../../domain/entities/Recipe';

export class FridgeDB extends Dexie {
  ingredients!: EntityTable<Ingredient, 'id'>;
  recipes!: EntityTable<Recipe, 'id'>;

  constructor() {
    super('fridgeos');
    this.version(1).stores({
      ingredients: 'id, nameNormalized, addedAt',
      recipes: 'id, name, updatedAt'
    });
  }
}

export const db = new FridgeDB();
