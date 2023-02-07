import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Api } from "app/model/api";
import { grocery_list } from "components/grocery-list/ui";
import { Product, FridgeSliceState, Status } from "./types";

export const fetchFridgeProducts = createAsyncThunk<
  Product[],
  Record<string, string>
>("fetch/fridgeSlice", async ({}) => {
  // const { meals } = await Api.Products.getProducts();
  return new Promise((resolve) => resolve(grocery_list));
});

const initialState: FridgeSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
};

export const fridgeSlice = createSlice({
  name: "fridge",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    // <---- Get all recipes ---->
    builder.addCase(fetchFridgeProducts.pending, (state, action) => {
      // @ts-ignore
      state.items = [{}, {}, {}, {}, {}, {}];
      state.status = Status.LOADING;
    });
    builder.addCase(fetchFridgeProducts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchFridgeProducts.rejected, (state, action) => {
      state.items = [];
      state.status = Status.ERROR;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setItems } = fridgeSlice.actions;

export default fridgeSlice.reducer;
