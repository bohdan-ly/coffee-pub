import { NavigateFunction } from "react-router-dom";

let navigateFunc: NavigateFunction | null = null;

export const setNavigate = (navigate: NavigateFunction): void =>
  void (navigateFunc = navigate);

export const navigateTo = (path: string): void =>
  void (navigateFunc && navigateFunc(path));

export const PATHS = {
  root: "/",
  main: {
    root: "/main",
    fridge: "/fridge",
    recipe: "/recipe/:recipeId",
  },
  error: {
    root: "/error",
    accessDenied: "/error/401",
    serverError: "/error/500",
  },
};
