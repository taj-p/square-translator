import React from "react";

const Square = React.memo(({ left, top }) => {
  return <div className="square" style={{ left, top }}></div>;
});

export default Square;
