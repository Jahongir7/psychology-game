import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import SpeechGame from "./pages/Speech";
import Drag from "./pages/Drag";



const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SpeechGame />} />
      <Route path="/drag" element={<Drag />} />
    </Routes>
  );
};

export default App;
