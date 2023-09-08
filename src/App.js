import React, { useState } from "react";
import "./App.css";
import Square from "./Square";

let xcount = 0;
let ocount = 0;
let gameOver = false;
let msg = 0;

function App() {
  const [fourByFour, setFourByFour] = useState(false);
  const [squares, setSquares] = useState(new Array(9).fill(""));
  const [player, setPlayer] = useState(true);
  const [grid, setGrid] = useState("4x4")

  const winner = ["Who Will Win", "X Wins", "O Wins", "Cat's Game"];

  const resetHandler = () => {
    setSquares(
      new Array(!fourByFour ? 9 : 16).fill("")
    );
    setPlayer(true);
    gameOver = false;
  };
  
  const setThree = () => {
    setFourByFour(!fourByFour)
    resetHandler()
    setGrid("4x4")
  }
  
  const setFour = () => {
    setFourByFour(!fourByFour)
    resetHandler()
    setGrid("3x3")
  }

  const calculateWinner = (Arr) => {
    let lines = !fourByFour
      ? [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ]
      : [
          [0, 1, 2, 3],
          [4, 5, 6, 7],
          [8, 9, 10, 11],
          [12, 13, 14, 15],
          [0, 4, 8, 12],
          [1, 5, 9, 13],
          [2, 6, 10, 14],
          [3, 7, 11, 15],
          [0, 5, 10, 15],
          [3, 6, 9, 12],
        ];

    console.log(lines);

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c, d] = lines[i];

      if (!fourByFour ? Arr[a] && Arr[a] === Arr[b] && Arr[a] === Arr[c] : ((Arr[a] && Arr[a] === Arr[b] && Arr[a] === Arr[c] && Arr[a] === Arr[d]))) {
        if (Arr[a] === "X") {
          xcount++;
          gameOver = true;
          msg = 1;
          return;
        } else if (Arr[a] === "O") {
          ocount++;
          gameOver = true;
          msg = 2;
          return;
        }
      }
    }
    if (squares.includes("")) {
      msg = 0;
      return;
    }
    gameOver = false;
    msg = 3;
    return;
  };

  return (
    <div className="App">
      <button
      className="gridBtn"
        onClick={fourByFour ? setThree : setFour}
      >
        Play on {grid} Grid
      </button>
      <div className={fourByFour ? "container fourGrid" : "container"}>
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
      <span>{winner[msg]}</span>
      <br />
      <button onClick={resetHandler}>Reset Grid</button>
      <h3>
        X Wins: {xcount} --- O Wins: {ocount}
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
