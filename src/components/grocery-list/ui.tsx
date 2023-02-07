import { YoutubeEmbed } from "components/youtube-embed";
import { useAppDispatch, useAppSelector } from "shared/hooks/global";
import { CloseIcon } from "shared/icons";
import { selectFridgeProducts } from "store/fridge/selector";
import { selectRecipeDetails } from "store/recipes/selector";
import { setRecipe } from "store/recipes/slice";
import { Ingredients } from "store/recipes/types";

export const grocery_list = [
  { id: "apple", emoji: "🍏", name: "apple", count: 0 },
  { id: "meat", emoji: "🥩", name: "meat", count: 1, weight: 1, unit: "kg" },
  { id: "onion", emoji: "🧅", name: "onion", count: 1, weight: 1, unit: "kg" },
  { id: "bacon", emoji: "🥓", name: "bacon", count: 1, weight: 1, unit: "kg" },
  {
    id: "mushroom",
    emoji: "🍄",
    name: "mushroom",
    count: 30,
    weight: 800,
    unit: "g",
  },
  { id: "Rice", emoji: "🥓", name: "Rice", count: 1, weight: 1, unit: "kg" },
  { id: "Lime", emoji: "🥓", name: "Lime", count: 1, weight: 1, unit: "kg" },
  {
    id: "Garlic Clove",
    emoji: "🥓",
    name: "Garlic Clove",
    count: 1,
    weight: 1,
    unit: "kg",
  },
  {
    id: "Cucumber",
    emoji: "🥓",
    name: "Cucumber",
    count: 1,
    weight: 1,
    unit: "kg",
  },
  {
    id: "Carrots",
    emoji: "🥓",
    name: "Carrots",
    count: 1,
    weight: 1,
    unit: "kg",
  },
  {
    id: "Ground Beef",
    emoji: "🥓",
    name: "Ground Beef",
    count: 1,
    weight: 1,
    unit: "kg",
  },
  {
    id: "Soy Sauce",
    emoji: "🥓",
    name: "Soy Sauce",
    count: 1,
    weight: 1,
    unit: "kg",
  },
];

export const GroceryList = () => {
  const dispatch = useAppDispatch();

  const grocery_list = useAppSelector(selectFridgeProducts);

  const handleCloseRecipe = () => {
    dispatch(setRecipe(null));
  };

  return (
    <div>
      <ul className="mb-8 space-y-4 text-left">
        {grocery_list.map((i, idx) => (
          <li key={`${i.id}_${idx}`} className={`flex items-center space-x-3`}>
            <div className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400">
              {i.emoji}
            </div>
            <span>{`${i.count} ${i.name}${i.count > 1 ? "'s -" : " -"}`}</span>
            <span>{`${i.weight || "weight unknown"}${i.unit || ""}`}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
