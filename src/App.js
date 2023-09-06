import React, { useState } from "react";
import "./App.css";
import Square from "./Square";

let xcount = 0;
let ocount = 0;
let gameOver = false;

function App() {
  const [squares, setSquares] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState(true);

  const resetHandler = () => {
    setSquares(["", "", "", "", "", "", "", "", ""]);
    setPlayer(true);
    gameOver = false;
  };

  const calculateWinner = (Arr) => {
    let lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];


    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (Arr[a] && Arr[a] === Arr[b] && Arr[a] === Arr[c]) {
        if (Arr[a] === "X") {
          xcount++;
          gameOver = true
          return "X Wins!";
        } else if (Arr[a] === "O") {
          ocount++;
          gameOver = true
          return "O Wins"
        }
      }
    }
    if (squares.includes("")){
        return "Who will win?";
      }
      gameOver = false;
      return "Cat's Game";
    };

  return (
    <div className="App">
      <div className="container">
        {squares.map((value, index) => {
          return (
           <Square
              key={index}
              setSquares={setSquares}
              index={index}
              squareValue={value}
              squares={squares}
              player={player}
              setPlayer={setPlayer}
              gameOver={gameOver}
              calculateWinner={calculateWinner}
            />
          );
        })}
      </div>
      <span>{calculateWinner(squares)}</span>
      <br />
      <button onClick={resetHandler}>Reset Grid</button>
      <h3>
        {/* Deployment settings */}
        X Wins: {xcount / 2} --- O Wins: {ocount / 2} 

        {/* Development settings */}
        {/* X Wins: {xcount / 2} --- O Wins: {ocount / 2} */}
      </h3>
      <button
        onClick={() => {
          xcount = 0;
          ocount = 0;
          resetHandler();
        }}
      >
        Reset Wins
      </button>
    </div>
  );
}

export default App;
