import Header from "components/header";
import { Recipes } from "components/recipes-feed";
import React from "react";

export const MainPage: React.FC = () => {
  return (
    <div className="w-full">
      <Header />
      <Recipes />
    </div>
  );
};
