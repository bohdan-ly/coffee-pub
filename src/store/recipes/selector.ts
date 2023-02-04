import { RootState } from "app/model";

const selectRecipes = (state: RootState) => ({ ...state.recipes });

const selectRecipeDetails = (state: RootState) => state.recipes.selectedRecipe;

export { selectRecipes, selectRecipeDetails };
