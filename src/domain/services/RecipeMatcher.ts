import type { Ingredient } from '../entities/Ingredient';
import type { Recipe } from '../entities/Recipe';
import { normalize } from './TextNormalizer';

export interface MatchResult {
  recipe: Recipe;
  score: number;
  matchedIngredients: string[];
  missingIngredients: string[];
  type: 'perfect' | 'near' | 'partial';
}

const MAX_EDIT_DISTANCE = 2;

function levenshteinWithin(a: string, b: string, maxDistance: number): boolean {
  if (a === b) return true;
  if (Math.abs(a.length - b.length) > maxDistance) return false;

  const prev = new Array<number>(b.length + 1);
  const curr = new Array<number>(b.length + 1);

  for (let j = 0; j <= b.length; j += 1) prev[j] = j;

  for (let i = 1; i <= a.length; i += 1) {
    curr[0] = i;
    let rowMin = curr[0];

    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(
        prev[j] + 1,
        curr[j - 1] + 1,
        prev[j - 1] + cost
      );
      if (curr[j] < rowMin) rowMin = curr[j];
    }

    if (rowMin > maxDistance) return false;
    for (let j = 0; j <= b.length; j += 1) prev[j] = curr[j];
  }

  return prev[b.length] <= maxDistance;
}

function fuzzyMatch(a: string, b: string): boolean {
  return a.includes(b) || b.includes(a) || levenshteinWithin(a, b, MAX_EDIT_DISTANCE);
}

export function computeMatches(recipes: Recipe[], ingredients: Ingredient[]): MatchResult[] {
  const fridgeNames = Array.from(new Set(ingredients.map((i) => i.nameNormalized)));

  return recipes
    .map((recipe) => {
      const required = recipe.ingredients.filter((i) => !i.optional);
      if (required.length === 0) {
        return {
          recipe,
          score: 0,
          matchedIngredients: [],
          missingIngredients: [],
          type: 'partial' as const
        };
      }

      const normalizedRequired = required.map((i) => ({
        original: i.ingredientName,
        normalized: normalize(i.ingredientName)
      }));

      const matchedIngredients = normalizedRequired
        .filter((req) => fridgeNames.some((fridgeName) => fuzzyMatch(fridgeName, req.normalized)))
        .map((req) => req.original);

      const missingIngredients = normalizedRequired
        .filter((req) => !fridgeNames.some((fridgeName) => fuzzyMatch(fridgeName, req.normalized)))
        .map((req) => req.original);

      const score = Math.round((matchedIngredients.length / required.length) * 100);
      const type: MatchResult['type'] = score === 100 ? 'perfect' : score > 0 && missingIngredients.length <= 2 ? 'near' : 'partial';

      return { recipe, score, matchedIngredients, missingIngredients, type };
    })
    .filter((r) => r.score >= 30)
    .sort((a, b) => b.score - a.score);
}
