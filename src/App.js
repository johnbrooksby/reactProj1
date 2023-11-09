import React, { useState, useRef } from "react";
import "./App.css";
import Square from "./Square";

let xcount = 0;
let ocount = 0;
let gameOver = false;
let msg = 0;
let fourByFour = false;
let grid = "4x4";
let a = 0;
let b = false;


function App() {

  if (localStorage.getItem("light mode")) {
    b = localStorage.getItem("light mode");
  }
  
  const [player, setPlayer] = useState(true);
  let lightMode = useRef(b);
  const refresh = useState(true)
  const [squares, setSquares] = useState(new Array(9).fill(""));
  const [theme] = useState([
    "square",
    "orange",
    "purple",
    "green",
    "red",
    "yellow",
    "darkBlue",
    "orange",
    "purple",
    "darkGreen",
    "red",
    "darkYellow",
  ]);

  // localStorage.setItem("light mode", lightMode.current);

  console.log("lightmode1", lightMode.current)
  // console.log("local", localStorage.getItem("light mode"))
  // console.log("B", b)


  if (localStorage.getItem("color reference")) {
    a = localStorage.getItem("color reference");
  }
  const [color, setColor] = useState(theme[a]);
  localStorage.setItem("color reference", a);

  const winner = [
    player ? "X's turn" : "O's turn",
    "X Wins",
    "O Wins",
    "Cat's Game",
  ];

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
    <div className={lightMode.current ? "App lightMode" : "App"}>
    {/* <div className="App"> */}
      <button
        className={
          color === "orange"
            ? "buttonOrange gridBtn"
            : color === "purple"
            ? "buttonPurple gridBtn"
            : color === "green"
            ? "buttonGreen gridBtn"
            : color === "red"
            ? "buttonRed gridBtn"
            : color === "yellow"
            ? "buttonYellow gridBtn"
            : "gridBtn"
        }
        onClick={setFour}
      >
        Play on {grid} Grid
      </button>
      {grid === "3x3" && (
        <div>
          <p className={lightMode.current ? "text lightMode" : "text"}>
            To make the game more interesting, in the 4x4 grid you can win
            normally
          </p>
          <p className={lightMode.current ? "lessMargin text lightMode" : "lessMargin text"}> or by filling a 2x2 square.</p>
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
      <span className={lightMode.current ? "lightMode" : undefined}>{winner[msg]}</span>
      <br />
      <button
        onClick={resetHandler}
        className={
          color === "orange"
            ? "buttonOrange"
            : color === "purple"
            ? "buttonPurple"
            : color === "green"
            ? "buttonGreen"
            : color === "red"
            ? "buttonRed"
            : color === "yellow"
            ? "buttonYellow"
            : color === "darkYellow"
            ? "buttonDarkYellow"
            : color === "darkBlue"
            ? "buttonDarkBlue"
            : "themeBtn"
        }
      >
        Reset Grid
      </button>
      <h3 className={lightMode.current ? "lightMode" : undefined}>
        X Wins: {xcount} --- O Wins: {ocount}
      </h3>
      <button
        className={
          color === "orange"
            ? "buttonOrange"
            : color === "purple"
            ? "buttonPurple"
            : color === "green"
            ? "buttonGreen"
            : color === "red"
            ? "buttonRed"
            : color === "yellow"
            ? "buttonYellow"
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
      <div className="center">
        <div className={lightMode.current ? "aDiv aDivLight" : "aDiv"}>
          <button
            className="noStyleBtn"
            onClick={() => {
              setColor(theme[a]);
              localStorage.setItem("color reference", a);
            }}
          >
            <span
              className={lightMode.current ? "darkBlueA " :"blueSpan"}
              onClick={() => {
                a = lightMode.current ? 6 : 0;
              }}
            >
              Ch
            </span>
            <span
              className="orangeA"
              onClick={() => {
                a = 1;
              }}
            >
              an
            </span>
            <span
              className="purpleA"
              onClick={() => {
                a = 2;
              }}
            >
              ge
            </span>
            <span
              className="greenA"
              onClick={() => {
                a = 3;
              }}
            >
              {" "}
              Co
            </span>
            <span
              className="redA"
              onClick={() => {
                a = 4;
              }}
            >
              lo
            </span>
            <span
              className="yellowA"
              onClick={() => {
                a = lightMode.current ? 11 : 5;
              }}
            >
              rs
            </span>
          </button>
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
      <div className="darkmode">
        <button
          className="noStyleBtn"
          onClick={() => {
            // setLightMode(prevMode => (!prevMode)) 
            // console.log("bb", b)
            lightMode.current = !lightMode.current
            b = lightMode.current;
            localStorage.setItem("light mode", b)
            if (a > 5 && !lightMode.current){
              a = a - 6
            } else if (a < 6 && lightMode.current) {
              a = +a + 6
            }
            localStorage.setItem("color reference", a)
            refresh[1](prev => !prev)
          }}>
          {lightMode.current ? "Dark" : "Light"} Mode
        </button>
      </div>
    </div>
  );
}

export default App;
