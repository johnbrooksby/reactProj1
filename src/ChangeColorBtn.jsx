import React from 'react'

const ChangeColorBtn = ({lightMode, setColor, setRand, a, theme}) => {
  return (
    <div className="center">
        <div className={lightMode === "light" ? "aDiv aDivLight" : "aDiv"}>
          <button
            className="noStyleBtn"
            onClick={() => {
              setColor(theme[a]);
              setRand(false);
              localStorage.setItem("color reference", a);
              localStorage.setItem("rand", false)
            }}
          >
            <span
              className={lightMode === "light" ? "darkBlueA " : "blueSpan"}
              onClick={() => {
                a = lightMode === "light" ? 6 : 0;
              }}
            >
              Ch
            </span>
            <span
              className={lightMode === "light" ? "darkOrangeA" : "orangeA"}
              onClick={() => {
                a = lightMode === "light" ? 7 : 1;
              }}
            >
              an
            </span>
            <span
              className={lightMode === "light" ? "purpleA" : "purpleA2"}
              onClick={() => {
                a = lightMode === "light" ? 8 : 2;
              }}
            >
              ge
            </span>
            <span
              className={lightMode === "light" ? "darkGreenA " : "greenA"}
              onClick={() => {
                a = lightMode === "light" ? 9 : 3;
              }}
            >
              {" "}
              Co
            </span>
            <span
              className={lightMode === "light" ? "redA" : "redA2"}
              onClick={() => {
                a = lightMode === "light" ? 10 : 4;
              }}
            >
              lo
            </span>
            <span
              className={lightMode === "light" ? "darkYellowA " : "yellowA"}
              onClick={() => {
                a = lightMode === "light" ? 11 : 5;
              }}
            >
              rs
            </span>
          </button>
        </div>
      </div>
  )
}

export default ChangeColorBtn