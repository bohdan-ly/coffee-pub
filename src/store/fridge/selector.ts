import { RootState } from "app/model";

const selectFridge = (state: RootState) => ({ ...state.fridge });

const selectFridgeProducts = (state: RootState) => [...state.fridge.items];

export { selectFridge, selectFridgeProducts };
