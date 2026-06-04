import { AddIngredient, RemoveIngredient, UpdateQuantity } from '../application/fridge';
import { CreateRecipe, DeleteRecipe, UpdateRecipe } from '../application/recipe';
import { SuggestRecipes } from '../application/suggest';
import { IngredientRepo, RecipeRepo } from '../infrastructure/repositories';
import { IndexedDBEngine, type IStorageEngine } from '../infrastructure/storage';

export function createAppContainer(storageEngine: IStorageEngine = new IndexedDBEngine()) {
  const ingredientRepo = new IngredientRepo(storageEngine);
  const recipeRepo = new RecipeRepo(storageEngine);

  return {
    ingredientRepo,
    recipeRepo,
    addIngredient: new AddIngredient(ingredientRepo),
    removeIngredient: new RemoveIngredient(ingredientRepo),
    updateQuantity: new UpdateQuantity(ingredientRepo),
    createRecipe: new CreateRecipe(recipeRepo),
    updateRecipe: new UpdateRecipe(recipeRepo),
    deleteRecipe: new DeleteRecipe(recipeRepo),
    suggestRecipes: new SuggestRecipes(ingredientRepo, recipeRepo)
  };
}

export const appContainer = createAppContainer();
