import Header from "components/header";
import RecipeDetails from "components/recipe-details";
import { RecipesDiscover } from "components/recipes-discover";
import { RecipesFeed } from "components/recipes-feed";
import SearchBar from "components/search-bar";
import React from "react";

export const MainPage: React.FC = () => {
  return (
    <div className="w-full flex flex-col overflow-hidden">
      <Header />

      <section className="flex flex-col h-full md:overflow-hidden p-8 overflow-y-auto">
        <div className="flex flex-row justify-center">
          <div className="md:basis-2/4">
            <SearchBar />
            <br />
          </div>
        </div>
        <RecipesDiscover />
      </section>
    </div>
  );
};
