const queryParams = new URLSearchParams(window.location.search);
export const SQUARES_TO_RENDER = parseInt(
  queryParams.get("squares") || "15000",
  10,
);
