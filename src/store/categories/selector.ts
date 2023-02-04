import { RootState } from "app/model";

const selectCategories = (state: RootState) => ({ ...state.categories });

const selectCategoryId = (state: RootState) =>
  state.categories.selectedCategoryId;

const selectCategoryById = (id: string) => (state: RootState) =>
  state.categories.items.find((el) => el.idCategory === id);

export { selectCategories, selectCategoryId, selectCategoryById };
