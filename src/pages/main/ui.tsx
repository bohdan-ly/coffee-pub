import React from "react";
import Header from "components/header";
import RecipeCard from "components/recipe-card";
import { Recipes } from "components/recipes-feed";
import SearchBar from "components/search-bar";
import { CategoriesCard } from "components/categories-card/ui";

export const MainPage: React.FC = () => {
  return (
    <div className="w-full">
      <Header />

      <section className="p-8">
        <div className="flex flex-row justify-center">
          <div className="md:basis-2/4">
            <SearchBar />
            <br/>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:basis-3/4">
            <CategoriesCard />
          </div>
          <div className="md:basis-1/4">
            <RecipeCard />
          </div>
        </div>
      </section>
    </div>
  );
};
