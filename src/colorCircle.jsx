import React from "react";
import { useDrag } from "react-dnd";

const ColorCircle = ({ color }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "color",
    item: { color },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        backgroundColor: color,
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
        border: "2px solid white",
      }}
    ></div>
  );
};

export default ColorCircle;
