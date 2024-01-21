import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AppWithoutReconciliation from "./AppWithoutReconciliation";
import { vanillaImpl } from "./vanilla_impl";
import { SQUARES_TO_RENDER } from "./constants";

const queryParams = new URLSearchParams(window.location.search);
const useReact = queryParams.get("react") === "true";
const useReconciliation = queryParams.get("reconciliation") === "true";

const startTime = performance.now();
if (useReact) {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  if (useReconciliation) {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  } else {
    root.render(
      <React.StrictMode>
        <AppWithoutReconciliation />
      </React.StrictMode>,
      document.getElementById("root"),
    );
  }
} else {
  vanillaImpl();
}

// Basic performance stats...

const squaresRenderedElement = document.getElementById("squaresRendered");
squaresRenderedElement.textContent = `Squares Rendered: ${SQUARES_TO_RENDER}`;

const typeElement = document.getElementById("type");
typeElement.textContent = `Type: ${
  useReact
    ? useReconciliation
      ? "React w/ Reconciliation"
      : "React skip reconciliation"
    : "Vanilla"
}`;

const renderTimeElement = document.getElementById("renderTime");
const fpsElement = document.getElementById("fps");

let lastFrameTime = Date.now();
let averageFPS = 0;
const decay = 0.9; // You can adjust this value for more or less smoothing

function updateFPS() {
  const now = Date.now();
  const deltaTime = now - lastFrameTime;
  lastFrameTime = now;

  const currentFPS = 1000 / deltaTime;

  // Apply decaying average
  if (averageFPS <= 0 || averageFPS === Infinity) {
    averageFPS = currentFPS;
  } else {
    averageFPS = decay * averageFPS + (1 - decay) * currentFPS;
  }

  fpsElement.textContent = `FPS: ${Math.round(averageFPS)} `;
  requestAnimationFrame(updateFPS);
}

let interval = setInterval(() => {
  if (document.getElementsByClassName("square").length === SQUARES_TO_RENDER) {
    const endTime = performance.now();
    renderTimeElement.textContent = `Render Time: ${(
      endTime - startTime
    ).toFixed(2)} ms`;
    updateFPS();
    clearInterval(interval);
  }
}, 20);
