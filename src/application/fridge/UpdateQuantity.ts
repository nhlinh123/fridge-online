import type { IIngredientRepo, Ingredient, Unit } from '../../domain/ingredient';

export interface UpdateQuantityInput {
  id: string;
  quantity?: number;
  unit?: Unit;
}

export class UpdateQuantity {
  constructor(private readonly ingredientRepo: IIngredientRepo) {}

  async execute(input: UpdateQuantityInput): Promise<Ingredient> {
    const ingredient = await this.ingredientRepo.findById(input.id);
    if (!ingredient) throw new Error('Ingredient not found.');

    const updated = {
      ...ingredient,
      quantity: input.quantity,
      unit: input.unit ?? ingredient.unit
    };

    await this.ingredientRepo.save(updated);
    return updated;
  }
}
