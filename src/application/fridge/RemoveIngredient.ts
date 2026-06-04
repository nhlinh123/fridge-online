import type { IIngredientRepo } from '../../domain/ingredient';

export class RemoveIngredient {
  constructor(private readonly ingredientRepo: IIngredientRepo) {}

  execute(id: string): Promise<void> {
    return this.ingredientRepo.delete(id);
  }
}
