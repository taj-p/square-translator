import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AppWithoutReconciliation from "./AppWithoutReconciliation";
import { setupForm, setupPerformanceStats } from "./helpers";
import { vanillaImpl } from "./vanilla_impl";
const queryParams = new URLSearchParams(window.location.search);
const useReact = queryParams.get("react") === "true";
const skipReconciliation = queryParams.get("skipreconciliation") === "true";

export const SQUARES_TO_RENDER = parseInt(
  queryParams.get("squares") || "15000",
  10,
);
const squaresRenderedElement = document.getElementById("squaresRendered");
squaresRenderedElement.textContent = `Squares Rendered: ${SQUARES_TO_RENDER}`;

const typeElement = document.getElementById("type");
typeElement.textContent = `Type: ${
  useReact
    ? skipReconciliation
      ? "React skip reconciliation"
      : "React w/ Reconciliation"
    : "Vanilla"
}`;

setupForm(useReact, skipReconciliation, SQUARES_TO_RENDER);

const startTime = performance.now();
if (useReact) {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  if (skipReconciliation) {
    root.render(
      <React.StrictMode>
        <AppWithoutReconciliation />
      </React.StrictMode>,
      document.getElementById("root"),
    );
  } else {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  }
} else {
  vanillaImpl();
}

setupPerformanceStats(startTime, SQUARES_TO_RENDER);
