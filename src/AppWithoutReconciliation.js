import React, { useState } from "react";
import { SQUARES_TO_RENDER } from "./index";
import Square from "./Square";

const App = () => {
  const [squares, setSquares] = useState([]);
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

  const ref = React.useRef(null);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    let startPos = { x: 0, y: 0 };
    let dragPos = { x: 0, y: 0 };
    let isDragging = false;

    const handleMouseDown = (e) => {
      isDragging = true;
      startPos = {
        x: e.clientX - dragPos.x,
        y: e.clientY - dragPos.y,
      };
    };

    const handleMouseMove = (e) => {
      if (!isDragging) {
        return;
      }
      dragPos = {
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y,
      };
      node.style.transform = `translate(${dragPos.x}px, ${dragPos.y}px)`;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };
    node.addEventListener("mousedown", handleMouseDown);
    node.addEventListener("mousemove", handleMouseMove);
    node.addEventListener("mouseup", handleMouseUp);
  }, [ref.current]);

  return (
    <div id="container" ref={ref}>
      {squares.map((square) => (
        <Square key={square.id} left={square.left} top={square.top} />
      ))}
    </div>
  );
};

export default App;
