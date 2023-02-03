import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "app/model/api";
import { Category, CategoriesSliceState, Status } from "./types";

export const fetchCategories = createAsyncThunk<
  Category[],
  Record<string, string>
>("categories/fetchCategories", async ({}) => {
  const { categories } = await Api.Categories.getCategories();
  return categories;
});

const initialState: CategoriesSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state, action) => {
      // @ts-ignore
      state.items = [{}, {}, {}, {}, {}, {}];
      state.status = Status.LOADING;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.items = [];
      state.status = Status.ERROR;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setItems } = categoriesSlice.actions;

export default categoriesSlice.reducer;
