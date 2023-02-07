export type Product = {
  image: string;
  idIngredient: string;
  strIngredient: string;
  strType: string | null;
  strDescription: string;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface ProductSliceState {
  items: Product[];
  status: Status;
}
