import { describe, expect, it } from 'vitest';
import type { Ingredient } from '../ingredient';
import type { Recipe } from '../recipe';
import { suggestRecipes } from './SuggestService';

const now = new Date('2026-06-04T00:00:00.000Z');

function ingredient(name: string, nameNormalized: string): Ingredient {
  return {
    id: nameNormalized,
    name,
    nameNormalized,
    unit: 'relative',
    addedAt: now
  };
}

function recipe(name: string, refs: string[]): Recipe {
  return {
    id: name,
    name,
    servings: 2,
    cookTimeMinutes: 20,
    items: refs.map((ingredientRef) => ({ ingredientRef, amount: 1, unit: 'relative' })),
    tags: [],
    steps: [],
    createdAt: now,
    updatedAt: now
  };
}

describe('suggestRecipes', () => {
  it('scores recipes and hides matches below 60 percent', () => {
    const suggestions = suggestRecipes(
      [recipe('Trứng cà chua', ['trung', 'ca chua']), recipe('Canh rau', ['rau', 'nuoc mam'])],
      [ingredient('Trứng', 'trung'), ingredient('Cà chua', 'ca chua')]
    );

    expect(suggestions).toHaveLength(1);
    expect(suggestions[0]).toMatchObject({ score: 100, tier: 'ready', matchedIngredientRefs: ['trung', 'ca chua'] });
  });

  it('marks 60 to 99 percent matches as missing-few', () => {
    const suggestions = suggestRecipes(
      [recipe('Bữa nhanh', ['trung', 'ca chua', 'hanh'])],
      [ingredient('Trứng', 'trung'), ingredient('Cà chua', 'ca chua')]
    );

    expect(suggestions[0]).toMatchObject({ score: 67, tier: 'missing-few', missingIngredientRefs: ['hanh'] });
  });
});
