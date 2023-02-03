import React from "react";

import { Loading } from "shared/loading";
import { Routes } from "pages";
import { ConnectAPI } from "app/providers/with-api";

export const App: React.FC = () => {
  const isReady = true;
  return <ConnectAPI>{(isReady && <Routes />) || <Loading />}</ConnectAPI>;
};
