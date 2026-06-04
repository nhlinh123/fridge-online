import type { IRecipeRepo, Recipe, RecipeItem } from '../../domain/recipe';
import type { Unit } from '../../domain/ingredient';
import { normalize } from '../../domain/services/TextNormalizer';

export interface CreateRecipeItemInput {
  name: string;
  amount?: number;
  unit?: Unit;
  optional?: boolean;
}

export interface CreateRecipeInput {
  name: string;
  items: CreateRecipeItemInput[];
  description?: string;
  servings?: number;
  cookTimeMinutes?: number;
  tags?: string[];
  steps?: string[];
}

export class CreateRecipe {
  constructor(private readonly recipeRepo: IRecipeRepo) {}

  async execute(input: CreateRecipeInput): Promise<Recipe> {
    const name = input.name.trim();
    const items = input.items.map(toRecipeItem).filter((item) => item.ingredientRef.length > 0);

    if (!name) throw new Error('Recipe name is required.');
    if (items.length === 0) throw new Error('Recipe needs at least one ingredient.');

    const now = new Date();
    const recipe: Recipe = {
      id: crypto.randomUUID(),
      name,
      description: input.description?.trim() || undefined,
      servings: input.servings ?? 2,
      cookTimeMinutes: input.cookTimeMinutes ?? 20,
      items,
      tags: input.tags ?? [],
      steps: input.steps ?? [],
      createdAt: now,
      updatedAt: now
    };

    await this.recipeRepo.save(recipe);
    return recipe;
  }
}

function toRecipeItem(input: CreateRecipeItemInput): RecipeItem {
  return {
    ingredientRef: normalize(input.name),
    amount: input.amount ?? 1,
    unit: input.unit ?? 'relative',
    optional: input.optional
  };
}
