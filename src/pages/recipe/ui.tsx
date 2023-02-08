import { FloatingSidebar } from "components/floating-sidebar";
import Header from "components/header";
import { FullRecipe } from "components/recipe-details";
import React from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "shared/hooks/global";
import { RecipesActions } from "store/recipes/actions";
import { selectRecipeDetails } from "store/recipes/selector";

export const RecipePage: React.FC = () => {
  const { recipeId } = useParams();

  const dispatch = useAppDispatch();
  const { setRecipeDetails } = RecipesActions(dispatch)({});
  const recipe = useAppSelector((store) => selectRecipeDetails(store));

  React.useEffect(() => {
    if (recipeId !== recipe?.idMeal && recipeId) {
      setRecipeDetails(recipeId);
    }
  }, [recipeId]);

  return (
    <div className="w-full flex flex-col overflow-hidden">
      <Header />
      <FloatingSidebar />
      {recipe && <FullRecipe recipe={recipe} />}
    </div>
  );
};
