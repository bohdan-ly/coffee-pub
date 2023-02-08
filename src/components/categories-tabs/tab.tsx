import React from "react";
import { useAppDispatch, useAppSelector } from "shared/hooks/global";
import { setCategoryId } from "store/categories/slice";
import { Category, Status } from "store/categories/types";
import { selectFridgeProducts } from "store/fridge/selector";
import { fetchRecipes } from "store/recipes/slice";

export const CategoryTab: React.FC<{
  category: Category;
  status: Status;
  selected: string | null;
}> = ({ category, status, selected }) => {
  const dispatch = useAppDispatch();

  const products = useAppSelector(selectFridgeProducts);

  const handleCategoryClick = () => {
    const { idCategory, strCategory } = category;
    dispatch(setCategoryId(idCategory));
    dispatch(fetchRecipes({ strCategory, products }));
  };

  return (
    <li
      className="-mb-px mr-1 p-2 cursor-pointer"
      onClick={handleCategoryClick}
    >
      <a
        href={`/main?category=${category.strCategory}`}
        onClick={(e) => e.preventDefault()}
        className={`inline-block border-l border-t border-r rounded-t py-2 px-4 text-white hover:text-indigo-500 dark:hover:text-black ${
          selected === category.idCategory
            ? "bg-indigo-700 dark:text-black dark:bg-yellow-500 font-semibold"
            : "bg-transparent"
        }`}
      >
        {status === Status.LOADING ? "loading" : category.strCategory}
      </a>
    </li>
  );
};
