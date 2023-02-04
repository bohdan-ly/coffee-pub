import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  selectedCategoryId: null,
  status: Status.LOADING, // loading | success | error
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setCategoryId: (state, action: PayloadAction<string>) => {
      state.selectedCategoryId = action.payload;
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
      state.selectedCategoryId = action.payload[0].idCategory;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.items = [];
      state.status = Status.ERROR;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setItems, setCategoryId } = categoriesSlice.actions;

export default categoriesSlice.reducer;
