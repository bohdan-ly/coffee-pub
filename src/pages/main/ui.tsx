import Header from "components/header";
// import RecipeDetails from "components/recipe-details";
import { RecipesDiscover } from "components/recipes-discover";
// import { RecipesFeed } from "components/recipes-feed";
import SearchBar from "components/search-bar";
import React from "react";

export const MainPage: React.FC = () => {
  return (
    <div className="w-full flex flex-col overflow-hidden">
      {/* <Header /> */}

      <div className="header bg-cover bg-center bg-no-repeat bg-origin-border backdrop-opacity-40">
        <Header />
        <div className="content">
            <div className="flex flex-row justify-center">
              <div className="px-2 lg:basis-3/4 pt-24">
                <h1 className="h1 text-slate-800 text-3xl md:text-5xl text-center font-bold leading-snug mb-12 dark:bg-black/[.90]">
                  <span className="text-4xl md:text-6xl">Let's cook together!</span>
                  <br/>
                  We have <span className="text-blue-700">500+ free</span> recipes in 
                  <span className="text-blue-700"> 20+ </span>categories.
                </h1>
                <SearchBar />
                <br />
              </div>
          </div>
        </div>
      </div>

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
