import { RootState } from "app/model";

const selectCategories = (state: RootState) => ({ ...state.categories });

const selectCategoryById = (id: string) => (state: RootState) => ({
  item: state.categories.items.find((el) => el.idCategory === id),
});

export { selectCategories, selectCategoryById };
