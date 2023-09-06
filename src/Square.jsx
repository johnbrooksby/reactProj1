import React from "react";

const Square = (props) => {
  const handleClick = () => {
    // console.log("Square", props.winner)
        if (!props.squareValue && !props.winner) {
            if (props.player) {
                props.squares.splice(props.index, 1, "X");
                props.setSquares(props.squares);
                props.setPlayer(!props.player);
            } else if (!props.player) {
                props.squares.splice(props.index, 1, "O");
                props.setSquares(props.squares);
                props.setPlayer(!props.player);
            }
        }
    // }
  };

  // No logo for "O"
  return <div className="square" onClick={handleClick}>{props.squareValue}</div>;

  // Devmountain Logo
  // return <div className="square" onClick={handleClick}>{props.squareValue === "O" ? <img src="https://cdn.discordapp.com/attachments/830137099042816080/984895322184634448/devcircle_1.png" alt="devmountain logo"/> : props.squareValue}</div>;
};

export default Square;
