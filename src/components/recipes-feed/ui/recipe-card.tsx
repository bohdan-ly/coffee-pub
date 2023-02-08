import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "shared/hooks/global";
import { useMediaLayout } from "shared/hooks/mobile";
import { Thumbnail } from "shared/skeleton";
import { Text } from "shared/skeleton/text";
import { RecipesActions } from "store/recipes/actions";
import { selectRecipes } from "store/recipes/selector";
import { Recipe, Status } from "store/recipes/types";

export const RecipeCard: React.FC<{
  recipe: Recipe;
}> = ({ recipe }) => {
  const dispatch = useAppDispatch();
  const isMobile = useMediaLayout();
  const navigate = useNavigate();

  const { setRecipeDetails } = RecipesActions(dispatch)({});
  const { status } = useAppSelector(selectRecipes);

  const handleSelectRecipe = () => {
    if (isMobile) {
      navigate(`/recipe/${recipe.idMeal}`);
    } else {
      setRecipeDetails(recipe.idMeal);
    }
  };

  return (
    <div
      className={`${
        recipe.isCookable ? "" : "grayscale"
      } w-full mb-5 md:mb-0 md:w-1/3 xl:w-1/4 md:p-6 flex flex-col hover:shadow-lg rounded-md hover:-translate-y-1 hover:scale-102 hover:bg-indigo-400 dark:hover:bg-yellow-500 duration-300`}
      onClick={handleSelectRecipe}
    >
      <a href="#">
        {status === Status.LOADING ? (
          <>
            <Thumbnail height="206px" />
            <Text />
          </>
        ) : (
          <>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <p className="text-white pt-3 pb-3 text-center">{recipe.strMeal}</p>
          </>
        )}
      </a>
    </div>
  );
};
