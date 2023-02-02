import React from "react";

import { Loading } from "shared/loading";
import { Routes } from "pages";

export const App: React.FC = () => {
  const isReady = true;
  return <>{(isReady && <Routes />) || <Loading />}</>;
};
