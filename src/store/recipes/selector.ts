import { RootState } from "app/model";

const selectRecipes = (state: RootState) => ({ ...state.recipes });

const selectFilteredRecipes = (state: RootState) => {
  const filteredRecipes = state.recipes.items.filter(
    (recipes) => recipes.strMeal?.indexOf(state.filter.query) !== -1
  );
  filteredRecipes.sort((a, b) =>
    b.isCookable === a.isCookable ? 0 : a.isCookable ? -1 : 1
  );
  return filteredRecipes;
};

const selectRecipeDetails = (state: RootState) => state.recipes.selectedRecipe;

export { selectRecipes, selectFilteredRecipes, selectRecipeDetails };
