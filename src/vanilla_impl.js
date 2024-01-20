import { SQUARES_TO_RENDER } from "./constants";

export function vanillaImpl() {
  const bodyContainer = document.createElement("div");
  bodyContainer.id = "container";
  document.body.appendChild(bodyContainer);

  document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById("container");

    for (let i = 0; i < SQUARES_TO_RENDER; i++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.style.left = `${Math.random() * window.innerWidth}px`;
      square.style.top = `${Math.random() * window.innerHeight}px`;
      container.appendChild(square);
    }

    // Drag functionality
    let isDragging = false;
    let startX,
      startY,
      initialX = 0,
      initialY = 0;

    container.addEventListener("mousedown", function(e) {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
    });

    document.addEventListener("mousemove", function(e) {
      if (isDragging) {
        const moveX = e.clientX - startX;
        const moveY = e.clientY - startY;
        container.style.transform = `translate(${initialX + moveX}px, ${initialY + moveY
          }px)`;
      }
    });

    document.addEventListener("mouseup", function(e) {
      if (isDragging) {
        initialX += e.clientX - startX;
        initialY += e.clientY - startY;
        isDragging = false;
      }
    });
  });
}
