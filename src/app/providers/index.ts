import compose from "compose-function";

import { withFallback } from "./with-fallback";
import { withRouter } from "./with-router";

export const withProviders = compose<React.FC>(withRouter, withFallback);
