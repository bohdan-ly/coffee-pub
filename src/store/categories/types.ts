export type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface CategoriesSliceState {
  items: Category[];
  status: Status;
  selectedCategoryId: null | string;
}
