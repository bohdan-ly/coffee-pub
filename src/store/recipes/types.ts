export type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

export type RecipeDetails = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strYoutube: string;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface RecipeSliceState {
  items: Recipe[];
  status: Status;
  recipeStatus: Status;
  selectedRecipe: RecipeDetails | null;
}
