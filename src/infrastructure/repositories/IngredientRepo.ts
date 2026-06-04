import type { Ingredient, IIngredientRepo } from '../../domain/ingredient';
import type { IStorageEngine } from '../storage';
import { normalize } from '../../domain/services/TextNormalizer';

const STORE = 'ingredients';

export class IngredientRepo implements IIngredientRepo {
  constructor(private readonly storage: IStorageEngine) {}

  findById(id: string): Promise<Ingredient | null> {
    return this.storage.get<Ingredient>(STORE, id);
  }

  async findAll(): Promise<Ingredient[]> {
    const ingredients = await this.storage.getAll<Ingredient>(STORE);
    return ingredients.sort((a, b) => b.addedAt.getTime() - a.addedAt.getTime());
  }

  async findByNormalizedName(nameNormalized: string): Promise<Ingredient | null> {
    const [ingredient] = await this.storage.query<Ingredient>(
      STORE,
      (item) => item.nameNormalized === normalize(nameNormalized)
    );
    return ingredient ?? null;
  }

  save(ingredient: Ingredient): Promise<void> {
    return this.storage.put(STORE, ingredient);
  }

  delete(id: string): Promise<void> {
    return this.storage.delete(STORE, id);
  }
}
