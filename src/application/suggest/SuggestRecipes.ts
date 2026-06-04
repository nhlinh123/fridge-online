import type { IIngredientRepo } from '../../domain/ingredient';
import type { IRecipeRepo } from '../../domain/recipe';
import { suggestRecipes, type RecipeSuggestion } from '../../domain/suggest';

export class SuggestRecipes {
  constructor(
    private readonly ingredientRepo: IIngredientRepo,
    private readonly recipeRepo: IRecipeRepo
  ) {}

  async execute(): Promise<RecipeSuggestion[]> {
    const [ingredients, recipes] = await Promise.all([
      this.ingredientRepo.findAll(),
      this.recipeRepo.findAll()
    ]);

    return suggestRecipes(recipes, ingredients);
  }
}
