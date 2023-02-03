import { SortState } from "../filter/types";

export type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  activeSize: number;
  activeType: string;
  count: number;
};

export type SearchPizzaParams = {
  sortBy: SortState;
  page: string;
  order: string;
  category: string;
  searchQuery: string;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}