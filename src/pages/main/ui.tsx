import React from "react";
import Header from "components/header";
import RecipeCard from "components/recipe-card";
import { Recipes } from "components/recipes-feed";

export const MainPage: React.FC = () => {
  return (
    <div className="w-full">
      <Header />

      <section className="py-8">
        <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
          <div className="w-full md:w-1/2 p-6 flex flex-col">
            <RecipeCard />
          </div>
          <div className="w-full md:w-1/2 p-6 flex flex-col">
            <RecipeCard />
          </div>
        </div>
      </section>

      <Recipes />
    </div>
  );
};
