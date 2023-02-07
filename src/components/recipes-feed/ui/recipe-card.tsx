import React from "react";
import { useAppDispatch } from "shared/hooks/global";
import { RecipesActions } from "store/recipes/actions";
import { fetchRecipeDetails } from "store/recipes/slice";
import { Recipe } from "store/recipes/types";

export const RecipeCard: React.FC<{
  recipe: Recipe;
}> = ({ recipe }) => {
  const dispatch = useAppDispatch();
  const { setRecipeDetails } = RecipesActions(dispatch)({});

  const handleSelectRecipe = () => {
    setRecipeDetails(recipe.idMeal);
  };

  return (
    <div
      className={`${
        recipe.isCookable ? "" : "grayscale"
      } w-full md:w-1/3 xl:w-1/4 md:p-6 flex flex-col hover:shadow-lg rounded-md hover:-translate-y-1 hover:scale-102 hover:bg-indigo-400 dark:hover:bg-yellow-500 duration-300`}
      onClick={handleSelectRecipe}
    >
      <a href="#">
        <img src={recipe.strMealThumb} />
        <p className="text-white pt-3 pb-3 text-center">{recipe.strMeal}</p>
      </a>
    </div>
  );
};
