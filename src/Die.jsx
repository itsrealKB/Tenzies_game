import React from "react";

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59e391" : "inherit",
    color: props.isHeld ? "white" : "black"
  };

  return (
    <button style={styles} onClick={props.holdDice}>
      {props.value}
    </button>
  );
}
