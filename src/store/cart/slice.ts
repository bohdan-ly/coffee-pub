import getCartFromLS from '@/utils/getCartFromLS';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartSliceState } from './types';

const { totalPrice, items } = getCartFromLS();

const initialState: CartSliceState = {
  totalPrice,
  items,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<CartItem>) => {
      const findItem = state.items.find((item) => item.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = state.items.reduce((a, v) => {
        const itemTotalPrice = v.count * v.price;
        return a + itemTotalPrice;
      }, 0);
    },
    changeProductCount: (state, action: PayloadAction<{ id: string; count: number }>) => {
      const { id, count } = action.payload;
      const findItem = state.items.find((item) => item.id === id);
      if (findItem) {
        findItem.count = count;
      }
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearProducts: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProduct, changeProductCount, removeProduct, clearProducts } = cartSlice.actions;

export default cartSlice.reducer;
