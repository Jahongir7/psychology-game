import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ColorCircle from "../colorCircle";
import Carrot from "../carrot";

const Drag = () => {
  const colors = ["white", "red", "green", "blue", "yellow", "purple", "orange", "pink"];

  return (
    <div style={{ background: "black", minHeight: "100vh", padding: "20px" }}>
      <DndProvider backend={HTML5Backend}>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          {colors.map((color) => (
            <ColorCircle key={color} color={color} />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
          <Carrot />
        </div>
      </DndProvider>
    </div>
  );
};

export default Drag;
