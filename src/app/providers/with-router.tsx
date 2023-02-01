import React from "react";
import { HashRouter, useNavigate } from "react-router-dom";

import { setNavigate } from "shared/navigation";

const NavigationSetter: React.FC = () => {
  const navigate = useNavigate();
  React.useEffect(() => setNavigate(navigate), [navigate]);
  return <></>;
};

export const withRouter = (component: () => React.ReactNode) =>
  function WithRouter() {
    return (
      <HashRouter>
        {component()}
        <NavigationSetter />
      </HashRouter>
    );
  };
