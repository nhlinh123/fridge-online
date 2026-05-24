import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Ingredient, Unit } from '../../domain/entities/Ingredient';
import type { Recipe } from '../../domain/entities/Recipe';
import { computeMatches, type MatchResult } from '../../domain/services/RecipeMatcher';
import { normalize } from '../../domain/services/TextNormalizer';

interface FridgeStore {
  ingredients: Ingredient[];
  recipes: Recipe[];
  matches: MatchResult[];
  addIngredient: (name: string, quantity?: number, unit?: Unit) => void;
  addRecipe: (name: string, ingredientNames: string[]) => void;
  recompute: () => void;
}

export const useFridgeStore = create<FridgeStore>()(
  persist(
    (set) => ({
      ingredients: [],
      recipes: [],
      matches: [],
      addIngredient: (name, quantity, unit = 'relative') => {
        const trimmedName = name.trim();
        if (!trimmedName) return;

        set((state) => {
          const ingredient: Ingredient = {
            id: crypto.randomUUID(),
            name: trimmedName,
            nameNormalized: normalize(trimmedName),
            quantity,
            unit,
            addedAt: new Date()
          };

          const ingredients = [...state.ingredients, ingredient];
          return {
            ingredients,
            matches: computeMatches(state.recipes, ingredients)
          };
        });
      },
      addRecipe: (name, ingredientNames) => {
        const trimmedName = name.trim();
        const normalizedIngredientNames = ingredientNames.map((part) => part.trim()).filter(Boolean);
        if (!trimmedName || normalizedIngredientNames.length === 0) return;

        set((state) => {
          const now = new Date();
          const recipe: Recipe = {
            id: crypto.randomUUID(),
            name: trimmedName,
            servings: 2,
            cookTimeMinutes: 20,
            tags: [],
            ingredients: normalizedIngredientNames.map((ingredientName) => ({ ingredientName })),
            createdAt: now,
            updatedAt: now
          };

          const recipes = [...state.recipes, recipe];
          return {
            recipes,
            matches: computeMatches(recipes, state.ingredients)
          };
        });
      },
      recompute: () => set((state) => ({ matches: computeMatches(state.recipes, state.ingredients) }))
    }),
    { name: 'fridge-os-store' }
  )
);
