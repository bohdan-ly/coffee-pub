import { RootState } from "app/model";
import { Product } from "store/fridge/types";

const selectRecipes = (state: RootState) => ({ ...state.recipes });

const selectFilteredRecipes = (state: RootState) => {
  const filteredRecipes = [...state.recipes.items].filter(
    (recipes) => recipes.strMeal?.indexOf(state.filter.query) !== -1
  );

  filteredRecipes.forEach((rec, idx) => {
    filteredRecipes[idx] = {
      ...filteredRecipes[idx],
      isCookable: Object.keys(rec.ingredients || {}).every(
        (i) =>
          !!state.fridge.items.find(
            (p: Product) => p.name.toLowerCase() === i.toLocaleLowerCase()
          )
      ),
    };
  });

  filteredRecipes.sort((a, b) =>
    b.isCookable === a.isCookable ? 0 : a.isCookable ? -1 : 1
  );
  return filteredRecipes;
};

const selectRecipeDetails = (state: RootState) => {
  if (state.recipes.selectedRecipe?.idMeal) {
    return {
      ...(state.recipes.selectedRecipe || {}),
      isCookable: Object.keys(
        state.recipes.selectedRecipe?.ingredients || {}
      ).every(
        (i) =>
          !!state.fridge.items.find(
            (p: Product) => p.name?.toLowerCase() === i.toLocaleLowerCase()
          )
      ),
    };
  }

  return null;
};

export { selectRecipes, selectFilteredRecipes, selectRecipeDetails };
