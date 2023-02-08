import { useAppDispatch, useAppSelector } from "shared/hooks/global";
import { selectFridgeProducts } from "store/fridge/selector";
import { setRecipe } from "store/recipes/slice";

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
            <span>{`${i.count} ${i.name}${i.count > 1 ? "'s" : ""}`}</span>
            {/* <span>{`- ${i.weight || "weight unknown"}${i.unit || ""}`}</span> */}
          </li>
        ))}
      </ul>
    </div>
  );
};
