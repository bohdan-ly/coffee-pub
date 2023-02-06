import { FloatingSidebar } from "components/floating-sidebar";
import { GroceryList } from "components/grocery-list";
import Header from "components/header";
import React from "react";

export const FridgePage: React.FC = () => {
  return (
    <div className="w-full flex flex-col overflow-hidden">
      <Header />
      <FloatingSidebar />
      <section className="flex justify-center align-middle h-full py-24">
        <GroceryList />
      </section>
    </div>
  );
};
