import React from "react";
import { Navigate, useRoutes } from "react-router-dom";

import { PATHS } from "shared/navigation";

// import MainPage from "pages/main";

// import { AccessDeniedPage } from "./access-denied";
// import { ServerErrorPage } from "./server-error";

const lazyLoad = (loadedModule: () => Promise<{ default: React.FC }>) =>
  React.lazy(() =>
    loadedModule().catch((err) => {
      if (err.message && /Loading chunk [\d]+ failed/.test(err.message)) {
        // return { default: ServerErrorPage };
        return { default: <div>500</div> };
      }
      return err;
    })
  );

const MainPage = lazyLoad(() => import("./main"));
const RecipePage = lazyLoad(() => import("./recipe"));
const FridgePage = lazyLoad(() => import("./fridge"));
const ShopPage = lazyLoad(() => import("./shop"));

const routesMap = [
  {
    path: PATHS.root,
    element: <Navigate to={PATHS.main.root} />,
  },
  {
    path: PATHS.main.root,
    element: <MainPage />,
  },
  {
    path: PATHS.main.recipe,
    element: <RecipePage />,
  },
  {
    path: PATHS.main.fridge,
    element: <FridgePage />,
  },
  {
    path: PATHS.main.shop,
    element: <ShopPage />,
  },
  {
    path: PATHS.error.accessDenied,
    // element: <AccessDeniedPage />,
    element: <div>401</div>,
  },
  {
    path: PATHS.error.serverError,
    // element: <ServerErrorPage />,
    element: <div>500</div>,
  },
];

export const Routes: React.FC = () => useRoutes(routesMap);
