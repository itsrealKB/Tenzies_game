import "./styles.css";
import Die from "./Die";
import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = useState(allDice());
  const [tenzies, setTenzies] = useState(false);
  const [guide, setGuide] = useState(false);
  const [rolls, setRolls] = useState(0);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    };
  }

  function allDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setDice((prevDice) =>
        prevDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setDice(allDice());
    }
    setRolls((prevRolls) => prevRolls + 1);
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  function resetGame() {
    setTenzies(false);
    setDice(allDice());
    setRolls(0);
  }

  function showGuide() {
    setGuide(true);
  }

  function hideGuide() {
    setGuide(false);
  }

  const diceElements = dice.map((die) => {
    return (
      <Die
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        holdDice={() => holdDice(die.id)}
      />
    );
  });

  const styles = {
    zIndex: 100
  };
  const gameContainer = tenzies ? "blur--container" : "game--container";
  const guideContainer = guide ? "show--guide" : "hide--guide";

  return (
    <div className="App">
      {tenzies && <Confetti style={styles} />}
      {tenzies && (
        <div className="won">
          <h1>Congratulations 👏 🎉</h1>
          <button className="reset" onClick={resetGame}>
            New Game
          </button>
        </div>
      )}
      <div className={gameContainer}>
        <h1>Tenzies</h1>
        <button className="play--how" onClick={showGuide}>
          How to play? 🙄 🤷‍♂️
        </button>
        <div className={guideContainer}>
          <h3>
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </h3>
          <button className="got--it" onClick={hideGuide}>
            Got it ✌👍
          </button>
        </div>
        <h3>Rolls Count = {rolls}.</h3>
        <div className="buttons--container">{diceElements}</div>
        <button className="roll--dice" onClick={rollDice}>
          Roll
        </button>
      </div>
    </div>
  );
}
