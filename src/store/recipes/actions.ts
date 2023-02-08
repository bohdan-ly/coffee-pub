import { AppDispatch } from "app/model";
import { Api } from "app/model/api";
import { notify } from "app/providers/with-notifications";
import { useAppSelector } from "shared/hooks/global";
import { selectFridgeProducts } from "store/fridge/selector";
import { Product } from "store/fridge/types";
import { setRecipe } from "./slice";
import { Recipe } from "./types";

const RecipesActions = (dispatch: AppDispatch) => {
  const products = useAppSelector(selectFridgeProducts);

  return ({}) => ({
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
    getExtendedRecipes: async (category: string): Promise<Recipe[] | null> => {
      try {
        const { meals } =
          (await Api.Recipes.getRecipesByCategory(category, [])) || {};

        if (!!meals?.length) {
          const recipes = [];

          for await (const recipe of meals) {
            const { meals } =
              (await Api.Recipes.getRecipeById(recipe.id)) || {};
            const meal = meals?.[0] || null;

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

            const isCookable = Object.keys(ingredients).every(
              (i) =>
                !!products.find(
                  (p: Product) => p.name.toLowerCase() === i.toLocaleLowerCase()
                )
            );

            recipes.push({ ...recipe, ingredients, isCookable });
          }

          return recipes;
        }

        return null;
      } catch (err) {
        console.error(err);
        return null;
      }
    },
  });
};

export { RecipesActions };
