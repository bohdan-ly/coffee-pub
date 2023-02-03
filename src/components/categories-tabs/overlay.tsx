import { useAppSelector } from "shared/hooks/global";
import { selectCategories, selectCategoryId } from "store/categories/selector";
import { Category } from "store/categories/types";
import { CategoryTab } from "./tab";

export const CategoriesTabs = () => {
  const { items, selected } = useAppSelector((store) => ({
    items: selectCategories(store),
    selected: selectCategoryId(store),
  }));

  const { items: categories, status } = items;

  return (
    <nav>
      <ul className="flex border-b overflow-hidden overflow-x-auto">
        {categories.map((category: Category, idx: number) => (
          <CategoryTab
            key={`${category.idCategory}_${idx}`}
            category={category}
            status={status}
            selected={selected}
          />
        ))}
      </ul>
    </nav>
  );
};
