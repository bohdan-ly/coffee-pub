export type Product = {
  idIngredient: string;
  strIngredient: string;
  image: string;
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
