import React from "react";
import { useAppDispatch } from "shared/hooks/global";
import { setCategoryId } from "store/categories/slice";
import { Category, Status } from "store/categories/types";
import { fetchRecipes } from "store/recipes/slice";

export const CategoryTab: React.FC<{
  category: Category;
  status: Status;
  selected: string | null;
}> = ({ category, status, selected }) => {
  const dispatch = useAppDispatch();

  const handleCategoryClick = () => {
    const { idCategory, strCategory } = category;
    dispatch(setCategoryId(idCategory));
    dispatch(fetchRecipes({ strCategory }));
  };

  return (
    <li
      className="-mb-px mr-1 p-2 cursor-pointer"
      onClick={handleCategoryClick}
    >
      <a
        className={` inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold ${
          selected === category.idCategory ? "bg-white" : "bg-sky-500/100"
        }`}
      >
        {status === Status.LOADING ? "loading" : category.strCategory}
      </a>
    </li>
  );
};
