import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Api } from "app/model/api";
import { Product, ProductSliceState, Status } from "./types";

export const fetchProducts = createAsyncThunk<
  Product[],
  Record<string, string>
>("products/fetchProducts", async ({}) => {
  const { meals } = await Api.Products.getProducts();
  return meals;
});

const initialState: ProductSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    // <---- Get all recipes ---->
    builder.addCase(fetchProducts.pending, (state, action) => {
      // @ts-ignore
      state.items = [{}, {}, {}, {}, {}, {}];
      state.status = Status.LOADING;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.items = [];
      state.status = Status.ERROR;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setItems } = productSlice.actions;

export default productSlice.reducer;
