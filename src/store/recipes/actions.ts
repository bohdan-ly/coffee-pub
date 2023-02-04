import { AppDispatch } from "app/model";
import { Api } from "app/model/api";
import { notify } from "app/providers/with-notifications";
import { setRecipe } from "./slice";

const RecipesActions = (dispatch: AppDispatch) => {
  return ({}) => {
    return {
      setRecipeDetails: async (recipeId: string) => {
        try {
          if (!recipeId) {
            notify({ message: "Failed to get recipe details" });
            return null;
          }

          const { meals } = (await Api.Recipes.getRecipeById(recipeId)) || {};
          const recipe = meals?.[0] || null;

          if (recipe) {
            dispatch(setRecipe(recipe));
          }

          return recipe;
        } catch (err) {
          console.error(err);
          return null;
        }
      },
    };
  };
};

export { RecipesActions };
