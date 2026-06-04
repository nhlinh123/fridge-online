import { create } from 'zustand';
import type { Ingredient, Unit } from '../domain/ingredient';
import type { Recipe } from '../domain/recipe';
import type { RecipeSuggestion } from '../domain/suggest';
import { appContainer } from './appContainer';

interface FridgeStore {
  ingredients: Ingredient[];
  recipes: Recipe[];
  suggestions: RecipeSuggestion[];
  isReady: boolean;
  initialize: () => Promise<void>;
  addIngredient: (name: string, quantity?: number, unit?: Unit, expiresAt?: Date) => Promise<void>;
  removeIngredient: (id: string) => Promise<void>;
  addRecipe: (name: string, ingredientNames: string[]) => Promise<void>;
  deleteRecipe: (id: string) => Promise<void>;
  recompute: () => Promise<void>;
  ingredientNameForRef: (ingredientRef: string) => string;
}

async function loadState() {
  const [ingredients, recipes, suggestions] = await Promise.all([
    appContainer.ingredientRepo.findAll(),
    appContainer.recipeRepo.findAll(),
    appContainer.suggestRecipes.execute()
  ]);

  return { ingredients, recipes, suggestions };
}

export const useFridgeStore = create<FridgeStore>((set, get) => ({
  ingredients: [],
  recipes: [],
  suggestions: [],
  isReady: false,
  initialize: async () => {
    const state = await loadState();
    set({ ...state, isReady: true });
  },
  addIngredient: async (name, quantity, unit = 'relative', expiresAt) => {
    await appContainer.addIngredient.execute({ name, quantity, unit, expiresAt });
    set(await loadState());
  },
  removeIngredient: async (id) => {
    await appContainer.removeIngredient.execute(id);
    set(await loadState());
  },
  addRecipe: async (name, ingredientNames) => {
    await appContainer.createRecipe.execute({
      name,
      items: ingredientNames.map((ingredientName) => ({ name: ingredientName }))
    });
    set(await loadState());
  },
  deleteRecipe: async (id) => {
    await appContainer.deleteRecipe.execute(id);
    set(await loadState());
  },
  recompute: async () => {
    const suggestions = await appContainer.suggestRecipes.execute();
    set({ suggestions });
  },
  ingredientNameForRef: (ingredientRef) => {
    const ingredient = get().ingredients.find((item) => item.nameNormalized === ingredientRef);
    return ingredient?.name ?? ingredientRef;
  }
}));
