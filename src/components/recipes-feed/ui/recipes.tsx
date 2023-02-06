import React from "react";
import { useAppSelector } from "shared/hooks/global";
import {
  selectCategoryById,
  selectCategoryId,
} from "store/categories/selector";
import { selectRecipes } from "store/recipes/selector";
import { RecipeCard } from "./recipe-card";

export const Recipes: React.FC<{ toolbar: React.ReactNode }> = ({
  toolbar,
}) => {
  const { category, recipes } = useAppSelector((store) => ({
    category: selectCategoryById(selectCategoryId(store) || "")(store),
    recipes: selectRecipes(store),
  }));

  const { items: recipesList, status } = recipes;

  return (
    <div className="container mx-auto flex flex-col pt-4 pb-12 md:overflow-hidden">
      {toolbar}
      <div className="mx-auto flex flex-wrap md:overflow-y-auto h-full pb-5 pt-2">
        {recipesList.map((rec, idx: number) => (
          <RecipeCard key={`${rec.idMeal}_${idx}`} recipe={rec} />
        ))}
      </div>
    </div>
  );
};
