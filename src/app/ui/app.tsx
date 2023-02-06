import React, { Suspense } from "react";

import { ConnectAPI } from "app/providers/with-api";
import { Routes } from "pages";
import { Loading } from "shared/loading";

export const App: React.FC = () => {
  const isReady = true;
  return (
    <ConnectAPI>
      <Suspense fallback={<Loading />}>
        {(isReady && <Routes />) || <Loading />}
      </Suspense>
    </ConnectAPI>
  );
};
