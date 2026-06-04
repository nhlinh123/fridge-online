import type { IRecipeRepo, Recipe } from '../../domain/recipe';
import type { IStorageEngine } from '../storage';

const STORE = 'recipes';

export class RecipeRepo implements IRecipeRepo {
  constructor(private readonly storage: IStorageEngine) {}

  findById(id: string): Promise<Recipe | null> {
    return this.storage.get<Recipe>(STORE, id);
  }

  async findAll(): Promise<Recipe[]> {
    const recipes = await this.storage.getAll<Recipe>(STORE);
    return recipes.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }

  save(recipe: Recipe): Promise<void> {
    return this.storage.put(STORE, recipe);
  }

  delete(id: string): Promise<void> {
    return this.storage.delete(STORE, id);
  }
}
