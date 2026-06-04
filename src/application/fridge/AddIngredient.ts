import type { IIngredientRepo, Ingredient, Unit } from '../../domain/ingredient';
import { normalize } from '../../domain/services/TextNormalizer';

export interface AddIngredientInput {
  name: string;
  quantity?: number;
  unit?: Unit;
  expiresAt?: Date;
}

export class AddIngredient {
  constructor(private readonly ingredientRepo: IIngredientRepo) {}

  async execute(input: AddIngredientInput): Promise<Ingredient> {
    const name = input.name.trim();
    if (!name) throw new Error('Ingredient name is required.');

    const ingredient: Ingredient = {
      id: crypto.randomUUID(),
      name,
      nameNormalized: normalize(name),
      quantity: input.quantity,
      unit: input.unit ?? 'relative',
      addedAt: new Date(),
      expiresAt: input.expiresAt
    };

    await this.ingredientRepo.save(ingredient);
    return ingredient;
  }
}
