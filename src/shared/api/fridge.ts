import { Api } from "app/model/api";
// @ts-ignore
import { MEAL_API } from "constants";
import { ApiAbortController } from "shared/utils/abort-controller";
import localForage from "localforage";
import { Product } from "store/fridge/types";

const grocery_list = [
  { id: "Rice", emoji: "🍽️", name: "Rice", count: 1, weight: 1, unit: "kg" },
  { id: "Lime", emoji: "🍽️", name: "Lime", count: 1, weight: 1, unit: "kg" },
  { id: "onion", emoji: "🍽️", name: "onion", count: 1, weight: 1, unit: "kg" },
  {
    id: "Garlic Clove",
    emoji: "🍽️",
    name: "Garlic Clove",
    count: 1,
    weight: 1,
    unit: "kg",
  },
  {
    id: "Cucumber",
    emoji: "🍽️",
    name: "Cucumber",
    count: 1,
    weight: 1,
    unit: "kg",
  },
  {
    id: "Carrots",
    emoji: "🍽️",
    name: "Carrots",
    count: 1,
    weight: 1,
    unit: "kg",
  },
  {
    id: "Ground Beef",
    emoji: "🍽️",
    name: "Ground Beef",
    count: 1,
    weight: 1,
    unit: "kg",
  },
  {
    id: "Soy Sauce",
    emoji: "🍽️",
    name: "Soy Sauce",
    count: 1,
    weight: 1,
    unit: "kg",
  },
];

export class ApiFridge {
  static async getProducts() {
    try {
      // const json = await Api.fetchRetry(`${MEAL_API}/list.php?i=list`, {
      //   signal: ApiAbortController.genController("getProducts").signal,
      // });

      // ApiAbortController.clearController("getProducts");

      // if (!json.success) {
      //   Api.handleErrorMessage(json);
      // }

      // const { meals } = json;
      const localMeals = await localForage.getItem("fridge");
      const meals = (localMeals || grocery_list) as Product[];

      if (!localMeals) {
        await localForage.setItem("fridge", meals);
      }

      return meals;
    } catch (err) {
      console.error(err);
      return [];
    }
  }
}
