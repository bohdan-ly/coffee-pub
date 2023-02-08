import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "app/model/api";
import localForage from "localforage";
import { FridgeSliceState, Product, Status } from "./types";

export const fetchFridgeProducts = createAsyncThunk<
  Product[],
  Record<string, string>
>("fetch/fridgeSlice", async ({}) => {
  const meals = await Api.Fridge.getProducts();
  return meals;
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
    addItem: (state, action) => {
      if (state.items.some((item) => item.id === action.payload.id)) return;
      state.items = [...state.items, action.payload];
      localForage.setItem("fridge", state.items);
    },
    addBatch: (state, action) => {
      const newItems = action.payload.filter(
        (item: { id: any }) => !state.items.some((el) => item.id === el.id)
      );

      state.items = [...state.items, ...newItems];
      localForage.setItem("fridge", state.items);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localForage.setItem("fridge", state.items);
    },
    removeBatch: (state, action) => {
      state.items = state.items.filter(
        (item) => !action.payload.includes(item.id)
      );
      localForage.setItem("fridge", state.items);
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
export const { setItems, addItem, addBatch, removeItem, removeBatch } =
  fridgeSlice.actions;

export default fridgeSlice.reducer;
