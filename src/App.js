import React, { useState } from "react";
import "./App.css";
import Square from "./Square";

let xcount = 0;
let ocount = 0;
let gameOver = false;
let msg = 0;
let fourByFour = false;
let grid = "4x4";
let a = 0;

function App() {
  const [player, setPlayer] = useState(true);
  const [squares, setSquares] = useState(new Array(9).fill(""));
  const [theme] = useState(["square", "orange", "purple", "green", "red", "yellow"]);
  // const [theme, setTheme] = useState(["square", "orange", 'purple', 'red', 'green'])
  
  if(localStorage.getItem("color reference")){
    a = localStorage.getItem("color reference")
  }
  const [color, setColor] = useState(theme[a]);
  localStorage.setItem("color reference", a)

  const winner = [
    player ? "X's turn" : "O's turn",
    "X Wins",
    "O Wins",
    "Cat's Game",
  ];

  // useEffect(() => {
  //   setColor(theme[Math.floor(Math.random() * theme.length)]);
  // });

  const setFour = () => {
    fourByFour = !fourByFour;
    resetHandler();
    grid = grid === "4x4" ? "3x3" : "4x4";
  };

  const resetHandler = () => {
    gameOver = false;
    setSquares(Array(!fourByFour ? 9 : 16).fill(""));
    setPlayer(true);
    msg = 0;
  };

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
          [0, 1, 4, 5],
          [1, 2, 5, 6],
          [2, 3, 6, 7],
          [4, 5, 8, 9],
          [5, 6, 9, 10],
          [6, 7, 10, 11],
          [8, 9, 12, 13],
          [9, 10, 13, 14],
          [10, 11, 14, 15],
        ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c, d] = lines[i];

      if (
        !fourByFour
          ? Arr[a] && Arr[a] === Arr[b] && Arr[a] === Arr[c]
          : Arr[a] &&
            Arr[a] === Arr[b] &&
            Arr[a] === Arr[c] &&
            Arr[a] === Arr[d]
      ) {
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
        className={
          color === "orange" ? "buttonOrange gridBtn"
            : color === "purple" ? "buttonPurple gridBtn"
            : color === "green" ? "buttonGreen gridBtn"
            : color === "red" ? "buttonRed gridBtn"
            : color === "yellow" ? "buttonYellow gridBtn"
            : "gridBtn"
        }
        onClick={setFour}
      >
        Play on {grid} Grid
      </button>
      {grid === "3x3" && (
        <div>
          <p>
            To make the game more interesting, in the 4x4 grid you can win
            normally
          </p>
          <p className="lessMargin"> or by filling a 2x2 square.</p>
        </div>
      )}
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
              color={color}
            />
          );
        })}
      </div>
      <span>{winner[msg]}</span>
      <br />
      <button
        onClick={resetHandler}
        className={
          color === "orange" ? "buttonOrange"
            : color === "purple" ? "buttonPurple"
            : color === "green" ? "buttonGreen"
            : color === "red" ? "buttonRed"
            : color === "yellow" ? "buttonYellow"
            : "themeBtn"
        }
      >
        Reset Grid
      </button>
      <h3>
        X Wins: {xcount} --- O Wins: {ocount}
      </h3>
      <button
        className={
          color === "orange" ? "buttonOrange"
            : color === "purple" ? "buttonPurple"
            : color === "green" ? "buttonGreen"
            : color === "red" ? "buttonRed"
            : color === "yellow" ? "buttonYellow"
            : "themeBtn"
        }
        onClick={() => {
          xcount = 0;
          ocount = 0;
          resetHandler();
        }}
      >
        Reset Wins
      </button>
      <br />
      <div className="aDiv">
        <a onClick={() => {
          setColor(theme[a])
          localStorage.setItem("color reference", a)
        }}>
        <span className="blueSpan"
          onClick={() => {
            a = 0;
          }}>Ch</span>
        <span className="orangeA"
          onClick={() => {
            a = 1;
          }}>an</span>
        <span className="purpleA"
          onClick={() => {
            a = 2;
          }}>ge</span>
        <span className="greenA"
          onClick={() => {
            a = 3
          }}> Co</span>
        <span className="redA"
          onClick={() => {
            a = 4
          }}>lo</span>
        <span className="yellowA"
          onClick={() => {
            a = 5
          }}>rs</span>
        </a>
        {/* <a
          className={
            color === "orange" ? "orangeA"
            : color === "purple" ? "purpleA"
              : color === "green" ? "greenA"
              : color === "red" ? "redA"
              : color === "yellow" ? "yellowA"
              : "blue"
          }
          onClick={() => {
            a++;
            setColor(theme[a]);
            if (a === theme.length) {
              a = 0;
            }
            localStorage.setItem("color reference", a)
          }}
        >
          Change Colors
        </a> */}
      </div>
    </div>
  );
}

export default App;
