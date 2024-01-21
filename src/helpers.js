export function setupForm(useReact, skipReconciliation, squares) {
  const formContainer = document.getElementById("form");

  const formHtml = `
  <form id="settingsForm">
    <label>
      Use React:
      <input type="checkbox" id="useReact" name="useReact" ${
        useReact ? "checked" : ""
      }>
    </label>
    <br>
    <label>
      Skip Reconciliation:
      <input type="checkbox" id="skipReconciliation" name="skipReconciliation" ${
        skipReconciliation ? "checked" : ""
      }>
    </label>
    <br>
    <label>
      Number of Squares:
      <input type="number" id="numSquares" name="numSquares" value="${squares}">
    </label>
    <br>
    <button type="submit">Update</button>
  </form>
`;

  formContainer.innerHTML = formHtml;

  // Form submission setup...
  const settingsForm = document.getElementById("settingsForm");

  settingsForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const useReactValue = document.getElementById("useReact").checked;
    const skipReconciliationValue =
      document.getElementById("skipReconciliation").checked;
    const numSquaresValue = document.getElementById("numSquares").value;

    const queryParams = new URLSearchParams();
    queryParams.set("react", useReactValue);
    queryParams.set("skipreconciliation", skipReconciliationValue);
    queryParams.set("squares", numSquaresValue);

    window.location.search = queryParams.toString();
  });
}

export function setupPerformanceStats(startTime, squares) {
  // Basic performance stats...

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
    if (document.getElementsByClassName("square").length === squares) {
      const endTime = performance.now();
      renderTimeElement.textContent = `Render Time: ${(
        endTime - startTime
      ).toFixed(2)} ms`;
      updateFPS();
      clearInterval(interval);
    }
  }, 20);
}
