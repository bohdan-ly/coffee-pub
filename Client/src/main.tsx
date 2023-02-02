import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";

import "./index.css";

const container = document.getElementById("root");
container && createRoot(container).render(<App />);
