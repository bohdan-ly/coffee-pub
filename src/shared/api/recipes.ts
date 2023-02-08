import { Api } from "app/model/api";
// @ts-ignore
import { MEAL_API } from "constants";
import { ApiAbortController } from "shared/utils/abort-controller";
import { Product } from "store/fridge/types";
import { Recipe } from "store/recipes/types";

export class ApiRecipes {
  static async getRecipesByCategory(strCategory: string, products: Product[]) {
    try {
      const json = await Api.fetchRetry(
        `${MEAL_API}/filter.php?c=${strCategory}`,
        {
          signal: ApiAbortController.genController("getRecipesByCategory")
            .signal,
        }
      );

      ApiAbortController.clearController("getRecipesByCategory");

      if (!json.success) {
        Api.handleErrorMessage(json);
      }

      const { meals } = json;

      if (!!meals?.length) {
        const recipes: Recipe[] = [];
        const promises = meals.map((recipe: { idMeal: string }) =>
          ApiRecipes.getRecipeById(recipe.idMeal)
        );

        const details = await Promise.all(promises);

        details.forEach((mealsDetails) => {
          const meal = mealsDetails.meals?.[0] || {};

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
          const recipe = meals.find(
            (m: { idMeal: any }) => meal.idMeal === m.idMeal
          );
          recipes.push({ ...recipe, ingredients, isCookable: false });
        });

        return { meals: recipes };
      }

      return json;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  static async getRecipeById(recipeId: string) {
    try {
      const json = await Api.fetchRetry(
        `${MEAL_API}/lookup.php?i=${recipeId}`,
        {
          signal: ApiAbortController.genController("getRecipeById").signal,
        }
      );

      ApiAbortController.clearController("getRecipeById");

      if (!json.success) {
        Api.handleErrorMessage(json);
      }

      return json;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
