import { FloatingSidebar } from "components/floating-sidebar";
import { GroceryList } from "components/grocery-list";
import Header from "components/header";
import React from "react";

export const FridgePage: React.FC = () => {
  return (
    <div className="w-full flex flex-col overflow-hidden">
      <Header />
      <h2 className="pt-6 pb-1 text-2xl font-semibold text-center">
        List of my products:
      </h2>
      <FloatingSidebar />
      <section className="flex justify-center align-middle h-full py-12">
        <GroceryList />
      </section>
    </div>
  );
};
