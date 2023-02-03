import { Api } from "app/model/api";
// @ts-ignore
import { MEAL_API } from "constants";
import { ApiAbortController } from "shared/utils/abort-controller";

export class ApiRecipes {
  static async getRecipesByCategory(strCategory: string) {
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
