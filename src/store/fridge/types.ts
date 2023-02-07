export type Product = {
  id: string;
  emoji: string;
  name: string;
  count: number;
  weight?: number;
  unit?: string;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface FridgeSliceState {
  items: Product[];
  status: Status;
}
