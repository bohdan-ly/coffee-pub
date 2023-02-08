import { FloatingSidebar } from "components/floating-sidebar";
import { GroceryList } from "components/grocery-list";
import Header from "components/header";
import { RecipesDiscover } from "components/recipes-discover";
import SearchBar from "components/search-bar";
import React from "react";

export const MainPage: React.FC = () => {
  return (
    <div className="w-full flex flex-col overflow-hidden">
      <Header />
      <FloatingSidebar />
      <section className="flex flex-col h-full md:overflow-hidden p-8 overflow-y-auto">
        <div className="flex flex-row justify-center">
          <div className="w-full md:basis-2/4">
            <SearchBar />
            <br />
          </div>
        </div>
        <RecipesDiscover />
      </section>
    </div>
  );
};
