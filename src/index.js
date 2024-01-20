import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { vanillaImpl } from "./vanilla_impl";
import { SQUARES_TO_RENDER } from "./constants";

const startTime = performance.now();
if (window.location.pathname.includes("react")) {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
} else {
  vanillaImpl();
}

// Basic performance stats...

const squaresRenderedElement = document.getElementById("squaresRendered");
squaresRenderedElement.textContent = `Squares Rendered: ${SQUARES_TO_RENDER}`;
const renderTimeElement = document.getElementById("renderTime");
const fpsElement = document.getElementById("fps");

let lastFrameTime = Date.now();
let frameRequest = 0;
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
  frameRequest = requestAnimationFrame(updateFPS);
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
