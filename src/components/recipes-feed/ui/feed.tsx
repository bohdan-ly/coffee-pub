import { CategoriesTabs } from "components/categories-tabs";
import { useAppSelector } from "shared/hooks/global";
import { selectRecipeDetails } from "store/recipes/selector";
import { FeedToolbar } from "./feed-toolbar";
import { Recipes } from "./recipes";

export const RecipesFeed = () => {
  const recipe = useAppSelector((store) => selectRecipeDetails(store));

  return (
    <section
      className={`transition-all ease-in duration-300 flex flex-col h-full md:overflow-hidden ${
        !recipe ? "basis-full" : "md:basis-2/3"
      }`}
    >
      <CategoriesTabs />
      <Recipes toolbar={<FeedToolbar />} />
    </section>
  );
};
