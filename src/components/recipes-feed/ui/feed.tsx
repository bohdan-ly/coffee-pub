import { Api } from "app/model/api";
import React from "react";
import { FeedToolbar } from "./feed-toolbar";
import { RecipeCard } from "./recipe-card";

type MealCategory = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

export const Recipes = () => {
  const [categories, setCategories] = React.useState<MealCategory[]>([]);
  const [meals, setMeals] = React.useState<Meal[]>([]);

  const syncFeed = async () => {
    const res = await Api.Categories.getCategories();
    const resFood = await fetch(
      "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood"
    );

    const formattedFood = await resFood.json();

    console.log(res);
    console.log(formattedFood);
    setCategories(res.categories);
    setMeals(formattedFood.meals);
  };

  React.useEffect(() => {
    syncFeed();
  }, []);

  return (
    <section className="py-8">
      <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
        <FeedToolbar />

        {categories.map((cat) => (
          <RecipeCard
            key={cat.idCategory}
            src={cat.strCategoryThumb}
            title={cat.strCategory}
            description={cat.strCategoryDescription}
          />
        ))}
        {meals.map((cat) => (
          <RecipeCard
            key={cat.idMeal}
            title={cat.strMeal}
            src={cat.strMealThumb}
          />
        ))}
      </div>
    </section>
  );
};
