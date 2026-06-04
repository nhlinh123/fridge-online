import Dexie, { type EntityTable } from 'dexie';
import type { Ingredient } from '../../domain/ingredient';
import type { Recipe } from '../../domain/recipe';

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
