import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterSliceState, SortState } from "./types";

const initialState: FilterSliceState = {
  categoryId: 0,
  sort: { name: 'popularity (hight to low)', sortKey: 'rating' },
  search: '',
  page: 1,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSort: (state, action: PayloadAction<SortState>) => {
      state.sort = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilterSliceState>) => {
      const { categoryId, sort, search, page } = action.payload;

      state.sort = sort;
      state.categoryId = Number(categoryId);
      state.search = search;
      state.page = Number(page);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategoryId, setSort, setSearch, setPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
