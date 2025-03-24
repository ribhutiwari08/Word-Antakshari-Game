import React, { useState } from "react";

function App() {
  const [words, setWords] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [error, setError] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState(1); // Track player turns

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentWord.trim()) {
      setError("Please enter a valid word.");
      return;
    }

    if (words.length > 0) {
      const lastWord = words[words.length - 1];
      if (currentWord[0].toLowerCase() !== lastWord[lastWord.length - 1].toLowerCase()) {
        setError(`Word must start with "${lastWord[lastWord.length - 1].toUpperCase()}"`);
        return;
      }
    }

    setWords([...words, currentWord]);
    setCurrentWord("");
    setError("");
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1); // Switch player
  };

  return (
    <div className="container">
      <h1>Word Antakshari Game</h1>
      <h2 className={`player-turn ${currentPlayer === 1 ? "player1" : "player2"}`}>
        Player {currentPlayer}'s Turn
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={currentWord}
          onChange={(e) => setCurrentWord(e.target.value)}
          placeholder="Enter a word"
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error">{error}</p>}
      <div className="history">
        <h2>Word Chain:</h2>
        <ul>
          {words.map((word, index) => (
            <li key={index}>
              <strong>Player {index % 2 === 0 ? 1 : 2}:</strong> {word}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
