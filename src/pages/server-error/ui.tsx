import React from "react";
import { useNavigate } from "react-router-dom";

import { PATHS } from "shared/navigation";

import error500 from "./error500_light.svg";

export const ServerErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <p>500: Internal Server Error</p>
      <img src={error500} />
      <p>
        You either tried some shady route or you came here by mistake. Whichever
        it is, try using the navigation or reload page.
      </p>
      <div>
        <div />
      </div>
      <div>
        <button
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
