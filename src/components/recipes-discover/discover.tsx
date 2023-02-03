import { RecipeDetails } from "components/recipe-details";
import { RecipesFeed } from "components/recipes-feed";
import React from "react";

export const RecipesDiscover = () => {
  return (
    <div className="flex flex-col gap-8 h-full md:flex-row">
      <RecipesFeed />
      <RecipeDetails />
    </div>
  );
};
