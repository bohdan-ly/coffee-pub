import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filter/slice';
import cart from './cart/slice';
import pizzas from './pizzas/slice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart,
    pizzas,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
