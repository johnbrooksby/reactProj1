import React, { useState, useRef } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import "./App.css";
import Square from "./Square";
import ChangeColorBtn from "./ChangeColorBtn";
import RandomBtn from "./RandomBtn";
import About from "./About";

let xcount = 0;
let ocount = 0;
let gameOver = false;
let msg = 0;
let fourByFour = false;
let grid = "4x4";
let a = localStorage.getItem("color reference");
let lightMode = "dark";
let lightness = (lightMode = "dark" ? 60 : 30);

function App() {
  if (localStorage.getItem("light mode") === "light") {
    lightMode = "light";
  }

  const navigate = useNavigate();
  const [rand, setRand] = useState(
    localStorage.getItem("rand") === "true" ? true : false
  );
  const [player, setPlayer] = useState(true);
  const [about, setAbout] = useState(false);
  const [squares, setSquares] = useState(new Array(9).fill(""));
  const [theme] = useState([
    "blue",
    "orange",
    "purple",
    "green",
    "red",
    "yellow",
    "darkBlue",
    "darkOrange",
    "purple2",
    "darkGreen",
    "red2",
    "darkYellow",
  ]);

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

  let colorTheme;
  color === "orange"
    ? (colorTheme = "buttonOrange")
    : color === "purple"
    ? (colorTheme = "buttonPurple")
    : color === "green"
    ? (colorTheme = "buttonGreen")
    : color === "red"
    ? (colorTheme = "buttonRed")
    : color === "yellow"
    ? (colorTheme = "buttonYellow")
    : color === "darkBlue"
    ? (colorTheme = "buttonDarkBlue")
    : color === "red2"
    ? (colorTheme = "buttonRed2")
    : color === "purple2"
    ? (colorTheme = "buttonPurple2")
    : color === "darkGreen"
    ? (colorTheme = "buttonDarkGreen")
    : color === "darkOrange"
    ? (colorTheme = "buttonDarkOrange")
    : color === "darkYellow"
    ? (colorTheme = "buttonDarkYellow")
    : (colorTheme = "themeBtn");

  const lightModeClickHandler = () => {
    if (lightMode === "light") {
      lightMode = "dark";
    } else {
      lightMode = "light";
    }
    if (+a > 5 && lightMode === "dark") {
      a -= 6;
    } else if (+a < 6 && lightMode === "light") {
      a = +a + 6;
    }
    setColor(theme[a]);
    localStorage.setItem("light mode", lightMode);
    localStorage.setItem("color reference", a);
    return;
  };

  return (
    <div className={lightMode === "light" ? "App lightMode" : "App"}>
      <button
        className={`${colorTheme} gridBtn`}
        onClick={setFour}
        style={{
          backgroundColor: rand
            ? `hsl(${Math.floor(Math.random() * 359)}, 100%, ${lightness}%`
            : null,
        }}
      >
        Play on {grid} Grid
      </button>
      {grid === "3x3" && (
        <div>
          <p className={lightMode === "light" ? "text lightMode" : "text"}>
            To make the game more interesting, in the 4x4 grid you can win
            normally
          </p>
          <p
            className={
              lightMode === "light"
                ? "lessMargin text lightMode"
                : "lessMargin text"
            }
          >
            {" "}
            or by filling a 2x2 square.
          </p>
        </div>
      )}
      <div className={fourByFour ? "container fourGrid" : "container"}>
        {squares.map((value, index) => {
          return (
            <Square
              key={index}
              lightMode={lightMode}
              setSquares={setSquares}
              index={index}
              squareValue={value}
              squares={squares}
              player={player}
              setPlayer={setPlayer}
              gameOver={gameOver}
              calculateWinner={calculateWinner}
              rand={rand}
              color={color}
            />
          );
        })}
      </div>
      <span className={lightMode === "light" ? "lightMode" : undefined}>
        {winner[msg]}
      </span>
      <br />
      <button
        onClick={resetHandler}
        className={colorTheme}
        style={{
          backgroundColor: rand
            ? `hsl(${Math.floor(Math.random() * 359)}, 100%, ${lightness}%`
            : null,
        }}
      >
        Reset Grid
      </button>
      <h3 className={lightMode === "light" ? "lightMode" : undefined}>
        X Wins: {xcount} --- O Wins: {ocount}
      </h3>
      <button
        className={colorTheme}
        onClick={() => {
          xcount = 0;
          ocount = 0;
          resetHandler();
        }}
        style={{
          backgroundColor: rand
            ? `hsl(${Math.floor(Math.random() * 359)}, 100%, ${lightness}%`
            : null,
        }}
      >
        Reset Wins
      </button>
      <br />
      <ChangeColorBtn
        lightMode={lightMode}
        setColor={setColor}
        setRand={setRand}
        theme={theme}
        a={a}
      ></ChangeColorBtn>
      <RandomBtn
        lightMode={lightMode}
        colorTheme={colorTheme}
        theme={theme}
        rand={rand}
        setRand={setRand}
      ></RandomBtn>
      <div>
        <button
          className={
            lightMode === "light"
              ? "noStyleBtn darkmode"
              : "noStyleBtn whiteText darkmode"
          }
          onClick={() => {
            lightModeClickHandler();
          }}
        >
          {lightMode === "light" ? "Dark" : "Light"} Mode
        </button>
      </div>
      <br />

      {/* Comment in when About page is ready */}
      {/* <a
        onClick={() => {
          navigate("/About");
        }}
      >
        About
      </a> */}

    </div>
  );
}

export default App;
