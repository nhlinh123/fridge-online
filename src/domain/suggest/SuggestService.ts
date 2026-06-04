import type { Ingredient } from '../ingredient/Ingredient';
import type { Recipe } from '../recipe/Recipe';

export type SuggestTier = 'ready' | 'missing-few' | 'low-match';

export interface RecipeSuggestion {
  recipe: Recipe;
  score: number;
  tier: SuggestTier;
  matchedIngredientRefs: string[];
  missingIngredientRefs: string[];
}

function getTier(score: number): SuggestTier {
  if (score === 100) return 'ready';
  if (score >= 60) return 'missing-few';
  return 'low-match';
}

export function suggestRecipes(recipes: Recipe[], ingredients: Ingredient[]): RecipeSuggestion[] {
  const availableRefs = new Set(ingredients.map((ingredient) => ingredient.nameNormalized));

  return recipes
    .map((recipe) => {
      const requiredItems = recipe.items.filter((item) => !item.optional);
      if (requiredItems.length === 0) {
        return {
          recipe,
          score: 0,
          tier: 'low-match' as const,
          matchedIngredientRefs: [],
          missingIngredientRefs: []
        };
      }

      const matchedIngredientRefs = requiredItems
        .filter((item) => availableRefs.has(item.ingredientRef))
        .map((item) => item.ingredientRef);
      const missingIngredientRefs = requiredItems
        .filter((item) => !availableRefs.has(item.ingredientRef))
        .map((item) => item.ingredientRef);
      const score = Math.round((matchedIngredientRefs.length / requiredItems.length) * 100);

      return {
        recipe,
        score,
        tier: getTier(score),
        matchedIngredientRefs,
        missingIngredientRefs
      };
    })
    .filter((suggestion) => suggestion.score >= 60)
    .sort((a, b) => b.score - a.score);
}
