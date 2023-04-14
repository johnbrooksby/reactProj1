import React, { useState } from "react";
import "./App.css";
import Square from "./Square";

let xcount = 0;
let ocount = 0;

function App() {
  const [squares, setSquares] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState(true);

  const resetHandler = () => {
    setSquares(["", "", "", "", "", "", "", "", ""]);
    setPlayer(true);
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
        Arr[a] === "X" ? xcount++ : ocount++
        return `${Arr[a]} wins!`;
      }
    }
    if (
      !Arr[0] ||
      !Arr[1] ||
      !Arr[2] ||
      !Arr[3] ||
      !Arr[4] ||
      !Arr[5] ||
      !Arr[6] ||
      !Arr[7] ||
      !Arr[8]
    ) {
      return "Who will win?";
    }
    return "Cat's game";
  };

  return (
    <div className="App">
      <div className="container">
        {squares.map((value, index) => {
          return (
            <Square
              setSquares={setSquares}
              index={index}
              squareValue={value}
              squares={squares}
              player={player}
              setPlayer={setPlayer}
            />
          );
        })}
      </div>
      <span>{calculateWinner(squares)}</span>
      <br />
      <button onClick={resetHandler}>Reset Grid</button>
      <h3>X Wins: {xcount/2} --- O Wins: {ocount/2}</h3>
      <button onClick={() => {
        xcount = 0;
        ocount = 0;
        resetHandler();
      }}>Reset Wins</button>
    </div>
  );
}

export default App;
