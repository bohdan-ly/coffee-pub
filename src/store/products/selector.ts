import { RootState } from "app/model";
import { Product } from "./types";

const selectProducts = (state: RootState) => ({ ...state.products });

const selectProductsByCategories = (state: RootState) => {
  const categories: Record<string, Product[]> = {};
  state.products.items.forEach((p) => {
    if (p.strType) {
      categories[p.strType] = [...(categories[p.strType] || []), p];
    } else {
      categories.other = [...(categories.other || []), p];
    }
  });

  return categories;
};

export { selectProducts, selectProductsByCategories };
