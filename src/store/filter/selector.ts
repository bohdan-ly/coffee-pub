import { RootState } from "app/model";

const getFilter = (state: RootState) => ({ ...state.filter });

const selectFilterQuery = (state: RootState) => state.filter.query;

export { getFilter, selectFilterQuery };
