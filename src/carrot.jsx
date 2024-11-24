import React, { useState } from "react";
import { useDrop } from "react-dnd";
import CarrotSVG from "./vegetables/carrot";
import BeetSVG from "./vegetables/beet";
import CabbageSVG from "./vegetables/cabbage";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const VegetablesGame = () => {
  const [color, setColor] = useState("#ffffff");
  const [step, setStep] = useState(1);

  const vegetableComponents = [
    { component: CarrotSVG, correctColor: "orange" },
    { component: BeetSVG, correctColor: "red" },
    { component: CabbageSVG, correctColor: "green" },
  ];

  const CurrentVegetable = vegetableComponents[step - 1]?.component;

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "color",
    drop: (item) => handleDrop(item.color),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleDrop = (droppedColor) => {
    setColor(droppedColor);

    if (droppedColor === vegetableComponents[step - 1].correctColor) {
      Swal.fire({
        icon: "success",
        title: "Barakalla!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        if (step < vegetableComponents.length) {
          setStep((prevStep) => prevStep + 1);
          setColor("#ffffff");
        } else {
          Swal.fire({
            icon: "info",
            title: "Game Over!",
            text: "You've completed the game!",
            confirmButtonText: "Restart",
          }).then(() => {
            setStep(1);
            setColor("#ffffff");
          });
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Iltimos boshqatdan urinib ko'ring.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div
      ref={drop}
      style={{
        display: "flex",
        justifyContent: "center",
        paddingBottom: "300px",
      }}
    >
      {CurrentVegetable ? (
        <CurrentVegetable color={color} />
      ) : (
        <h1 style={{color:"white", marginTop: "200px"}}>O'yin tugadi!</h1>
      )}
    </div>
  );
};

export default VegetablesGame;
