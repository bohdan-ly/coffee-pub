import { Api } from "app/model/api";
// @ts-ignore
import { MEAL_API } from "constants";
import { ApiAbortController } from "shared/utils/abort-controller";

export class ApiProducts {
  static async getProducts() {
    try {
      const json = await Api.fetchRetry(`${MEAL_API}/list.php?i=list`, {
        signal: ApiAbortController.genController("getProducts").signal,
      });

      ApiAbortController.clearController("getProducts");

      if (!json.success) {
        Api.handleErrorMessage(json);
      }

      const { meals } = json;

      if (meals?.length) {
        meals.forEach((_: any, idx: number) => {
          const formattedName = meals[idx].strIngredient.replace(/ /gi, "_");

          meals[idx] = {
            ...meals[idx],
            image: `https://www.themealdb.com/images/ingredients/${formattedName}.png`,
          };
        });
      }

      return json;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
