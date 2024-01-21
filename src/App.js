import React, { useState, useCallback } from "react";
import { SQUARES_TO_RENDER } from "./index";
import Square from "./Square";

const App = () => {
  const [squares, setSquares] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });

  // Generate squares on initial render
  React.useEffect(() => {
    const newSquares = [];
    for (let i = 0; i < SQUARES_TO_RENDER; i++) {
      newSquares.push({
        id: i,
        left: Math.random() * window.innerWidth,
        top: Math.random() * window.innerHeight,
      });
    }
    setSquares(newSquares);
  }, []);

  const handleMouseDown = useCallback(
    (e) => {
      setIsDragging(true);
      setStartPos({
        x: e.clientX - dragPos.x,
        y: e.clientY - dragPos.y,
      });
    },
    [dragPos.x, dragPos.y],
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (isDragging) {
        setDragPos({
          x: e.clientX - startPos.x,
          y: e.clientY - startPos.y,
        });
      }
    },
    [isDragging, startPos],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div
      id="container"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        transform: `translate(${dragPos.x}px, ${dragPos.y}px)`,
      }}
    >
      {squares.map((square) => (
        <Square key={square.id} left={square.left} top={square.top} />
      ))}
    </div>
  );
};

export default App;
