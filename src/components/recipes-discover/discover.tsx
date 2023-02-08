import { RecipeOverview } from "components/recipe-details";
import { RecipesFeed } from "components/recipes-feed";
import { useAppSelector } from "shared/hooks/global";
import { selectRecipeDetails } from "store/recipes/selector";

export const RecipesDiscover = () => {
  const recipe = useAppSelector((store) => selectRecipeDetails(store)) || {
    idMeal: "",
    strMeal: "Unknown",
    strYoutube: "",
    strMealThumb: "",
    tags: [],
    strArea: "",
    strCategory: "",
    strInstructions: "",
    strSource: "",
    ingredients: {},
  };

  return (
    <div className="flex flex-col gap-8 h-full md:flex-row">
      <RecipesFeed />
      {recipe.idMeal && <RecipeOverview recipe={recipe} />}
    </div>
  );
};
