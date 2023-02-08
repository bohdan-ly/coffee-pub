import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Api } from "app/model/api";
import { Product } from "store/fridge/types";
import { Recipe, RecipeDetails, RecipeSliceState, Status } from "./types";

export const fetchRecipes = createAsyncThunk<
  Recipe[],
  { strCategory: string; products: Product[] }
>("recipes/fetchRecipes", async ({ strCategory, products }) => {
  const { meals } = await Api.Recipes.getRecipesByCategory(
    strCategory,
    products
  );
  return meals;
});

export const fetchRecipeDetails = createAsyncThunk<
  Recipe,
  Record<string, string>
>("recipes/fetchRecipes", async ({ recipeId }) => {
  const { meals } = await Api.Recipes.getRecipeById(recipeId);
  return meals;
});

const initialState: RecipeSliceState = {
  items: [],
  selectedRecipe: null,
  recipeStatus: Status.LOADING, // loading | success | error
  status: Status.LOADING, // loading | success | error
};

export const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setRecipe: (state, action: PayloadAction<RecipeDetails | null>) => {
      state.selectedRecipe = action.payload;
    },
  },
  extraReducers: (builder) => {
    // <---- Get all recipes ---->
    builder.addCase(fetchRecipes.pending, (state, action) => {
      // @ts-ignore
      state.items = [{}, {}, {}, {}, {}, {}];
      state.status = Status.LOADING;
    });
    builder.addCase(fetchRecipes.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchRecipes.rejected, (state, action) => {
      state.items = [];
      state.status = Status.ERROR;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setItems, setRecipe } = recipeSlice.actions;

export default recipeSlice.reducer;
