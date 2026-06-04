import type { IRecipeRepo, Recipe } from '../../domain/recipe';

export class UpdateRecipe {
  constructor(private readonly recipeRepo: IRecipeRepo) {}

  async execute(recipe: Recipe): Promise<Recipe> {
    const updated = { ...recipe, updatedAt: new Date() };
    await this.recipeRepo.save(updated);
    return updated;
  }
}
