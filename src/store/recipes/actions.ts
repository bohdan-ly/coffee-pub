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
          const meal = meals?.[0] || null;

          if (meal) {
            const {
              idMeal,
              strMeal,
              strTags,
              strArea,
              strCategory,
              strMealThumb,
              strYoutube,
              strInstructions,
              strSource,
            } = meal;

            const ingredients: Record<string, string> = {};

            new Array(20).fill(0).some((i, idx) => {
              const ingredientKey = `strIngredient${idx + 1}`;
              const measureKey = `strMeasure${idx + 1}`;
              if (meal[ingredientKey] && meal[measureKey]) {
                ingredients[meal[ingredientKey]] = meal[measureKey];
                return false;
              }
              return true;
            });

            const recipe = {
              idMeal,
              strMeal,
              strMealThumb,
              strYoutube,
              tags: strTags?.split(",") || [],
              strArea,
              strCategory,
              strInstructions,
              strSource,
              ingredients,
            };

            dispatch(setRecipe(recipe));
            return recipe;
          }

          return null;
        } catch (err) {
          console.error(err);
          return null;
        }
      },
    };
  };
};

export { RecipesActions };
