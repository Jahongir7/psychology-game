import React, { useState, useEffect } from "react";

const imagesData = [
  { src: "/images/qaychi.jpg", name: "Qaychi" },
  { src: "/images/taroq.jpg", name: "Taroq" },
  { src: "/images/sabzi.jpg", name: "Sabzi" },
  { src: "/images/olma.jpg", name: "Olma" },
];

const SpeechGame = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [spokenWord, setSpokenWord] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [score, setScore] = useState(0); // Track the score
  const [gameOver, setGameOver] = useState(false); // Track game state

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Browseringiz mikrofonni qo'llab quvvatlamaydi");
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
      setMessage("To'g'ri!");
      setScore((prevScore) => prevScore + 1); // Increment score for correct answer
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
        setMessage("O'yin tugadi!");
        setGameOver(true); // Mark the game as over
      }
    }, 5500);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Ovoz orqali jismni aniqlash</h1>
      {!gameOver && currentIndex < imagesData.length && (
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
      {!gameOver && (
        <>
          <p>Rasmda ko'ringan jismni nomini ayting</p>
          <p>
            <strong>siz aytgan jism:</strong> {spokenWord}
          </p>
        </>
      )}
      {gameOver && (
        <div>
          <h2>O'yin tugadi!</h2>
          <h1>Sizning yakuniy ballingiz: <strong>{score}</strong> / {imagesData.length}</h1>
        </div>
      )}
    </div>
  );
};

export default SpeechGame;
