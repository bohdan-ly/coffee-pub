import React from "react";
import { useNavigate } from "react-router-dom";

import { PATHS } from "shared/navigation";

import error500 from "./error500_light.svg";

export const ServerErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <p>500: Internal Server Error</p>
      <img width="100%" height="100%" src={error500} alt="error 505" />
      <p>
        You either tried some shady route or you came here by mistake. Whichever
        it is, try using the navigation or reload page.
      </p>
      <div>
        <div />
      </div>
      <div>
        <button
          aria-label="reload app"
          onClick={() => {
            navigate(PATHS.root);
            window.location.reload();
          }}
        >
          Reload App
        </button>
      </div>
    </div>
  );
};
