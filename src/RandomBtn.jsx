import React from 'react'

const RandomBtn = ({lightMode, colorTheme, theme, rand, setRand}) => {
  return (
    <div>
        <button
          className={
            lightMode === "light"
              ? "noStyleBtn darkmode"
              : "noStyleBtn whiteText darkmode"
          }
          onClick={() => {
            colorTheme = theme[Math.floor(Math.random() * 12)]
            localStorage.setItem("rand", !rand)
            setRand(!rand);
          }}
        >
          Random Colors
        </button>
      </div>
  )
}

export default RandomBtn