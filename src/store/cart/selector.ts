import { RootState } from '@store/store';

const selectCart = (state: RootState) => ({ ...state.cart });

const selectCartItemById = (id: string) => (state: RootState) => ({
  item: state.cart.items.find((el) => el.id === id),
});

export { selectCart, selectCartItemById };
