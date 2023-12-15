import React from "react";

const Square = (props) => {
  const handleClick = () => {
    if (!props.squareValue && !props.gameOver) {
      if (props.player) {
        props.squares.splice(props.index, 1, "X");
        props.setSquares(props.squares);
        props.setPlayer(!props.player);
        props.calculateWinner(props.squares);
      } else if (!props.player) {
        props.squares.splice(props.index, 1, "O");
        props.setSquares(props.squares);
        props.setPlayer(!props.player);
        props.calculateWinner(props.squares);
      }
    } else {
      return;
    }
  };

  // No logo for "O"
  return (
    <div
      style={{
        borderColor: props.rand
          ? `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
              Math.random() * 255
            )}, ${Math.floor(Math.random() * 255)}`
          : null,
      }}
      className={
        props.color && props.lightMode === "light"
          ? `${props.color} lightMode`
          : props.color
          ? props.color
          : "blue"
      }
      onClick={handleClick}
    >
      {/* <div className="blue" onClick={handleClick}> */}
      {props.squareValue}
    </div>
  );

  // Devmountain Logo for "O"
  // return <div className="square" onClick={handleClick}>{props.squareValue === "O" ? <img src="https://cdn.discordapp.com/attachments/830137099042816080/984895322184634448/devcircle_1.png" alt="devmountain logo"/> : props.squareValue}</div>;
};

export default Square;
