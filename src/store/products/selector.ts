import { RootState } from "app/model";

const selectProducts = (state: RootState) => ({ ...state.products });

export { selectProducts };
