import type { IRecipeRepo } from '../../domain/recipe';

export class DeleteRecipe {
  constructor(private readonly recipeRepo: IRecipeRepo) {}

  execute(id: string): Promise<void> {
    return this.recipeRepo.delete(id);
  }
}
