import { Api } from "app/model/api";
// @ts-ignore
import { MEAL_API } from "constants";
import { ApiAbortController } from "shared/utils/abort-controller";

class ApiCategories {
  static async getCategories() {
    try {
      const json = await Api.fetchRetry(`${MEAL_API}/categories.php`, {
        signal: ApiAbortController.genController("getCategories").signal,
      });

      ApiAbortController.clearController("getCategories");

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

export default ApiCategories;
