export type SortState = {
  name: string;
  sortKey: 'rating' | '-rating' | 'price' | '-price' | 'title' | '-title';
};

export interface FilterSliceState {
  categoryId: number;
  sort: SortState;
  search: string;
  page: number;
}