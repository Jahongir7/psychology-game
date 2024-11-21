import React, { useState, useEffect } from "react";

const imagesData = [
  { src: "/images/qaychi.jpg", name: "Qaychi" },
  { src: "/images/taroq.jpg", name: "Taroq" },
  { src: "/images/sabzi.jpg", name: "Sabzi" },
  { src: "/images/olma.jpg", name: "Olma" },
];

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [spokenWord, setSpokenWord] = useState("");
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.lang = "uz-UZ";
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = false;

    recognitionInstance.onresult = (event) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript.trim();
      setSpokenWord(transcript);
    };

    recognitionInstance.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
    };

    setRecognition(recognitionInstance);
    recognitionInstance.start();

    return () => recognitionInstance.stop();
  }, []);

  useEffect(() => {
    if (
      spokenWord.toLowerCase() === imagesData[currentIndex].name.toLowerCase()
    ) {
      setMessage("Correct!");
    } else {
      setMessage("");
    }
  }, [spokenWord, currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < imagesData.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        setMessage("");
        setSpokenWord("");
      } else {
        clearInterval(interval);
        setMessage("Game Over!");
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Speech Recognition Game</h1>
      {currentIndex < imagesData.length && (
        <img
          src={imagesData[currentIndex].src}
          alt={imagesData[currentIndex].name}
          style={{
            width: "300px",
            height: "300px",
            objectFit: "contain",
            marginBottom: "20px",
          }}
        />
      )}
      <h2>{message}</h2>
      <p>
        Say the name of the object shown in the image:{" "}
        <b>{imagesData[currentIndex].name}</b>
      </p>
      <p>
        <strong>Your Speech:</strong> {spokenWord}
      </p>
    </div>
  );
};

export default App;
