import React from "react";
import { useDrag } from "react-dnd";

const ColorCircle = ({ color }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "color",
    item: { color },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        backgroundColor: color,
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
        margin: "5px",
      }}
    />
  );
};

export default ColorCircle;
