import React from "react";
import { useAppSelector } from "shared/hooks/global";
import {
  selectCategoryById,
  selectCategoryId,
} from "store/categories/selector";
import { selectFilterQuery } from "store/filter/selector";
import { selectFilteredRecipes } from "store/recipes/selector";
import { RecipeCard } from "./recipe-card";

export const Recipes: React.FC<{ toolbar: React.ReactNode }> = ({
  toolbar,
}) => {
  const { category, recipes } = useAppSelector((store) => ({
    category: selectCategoryById(selectCategoryId(store) || "")(store),
    recipes: selectFilteredRecipes(store),
  }));

  return (
    <div className="container mx-auto flex flex-col pt-4 pb-12 md:overflow-hidden">
      {toolbar}
      <div className="mx-auto flex flex-wrap md:overflow-y-auto h-full pb-5 pt-2">
        {recipes.map((rec, idx: number) => (
          <RecipeCard key={`${rec.idMeal}_${idx}`} recipe={rec} />
        ))}
      </div>
    </div>
  );
};
