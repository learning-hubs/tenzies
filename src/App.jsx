import logo from './logo.svg';
import './App.css';
import Die from './Die';
import { useState } from 'react';
import {nanoid} from 'nanoid';
import ReactConfetti from 'react-confetti';
function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());
  const [die, setDie] = useState({});

  function generateAllNewDice() {
    // const newDice = [];

    // for (let i=0;i<10;i++) {
    //   const rand = Math.ceil(Math.random() * 6);
    //   newDice.push(rand);
    // }

    // return newDice;

    return new Array(10)
                .fill(0)
                .map(() => ({
                  value: Math.ceil(Math.random() * 6),
                  isHeld: false,
                  id: nanoid()
                }));
  }

  function rollDice() {
    setDice(prevDice => prevDice.map(die => die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)}));
  }

  const hold = (id) => {
      setDice(prevDice => prevDice.map(die => die.id === id ? ({...die, isHeld: !die.isHeld}) : die));
  }

  const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value);

  const diceElements = dice.map(dieObj => <Die key={dieObj.id} value={dieObj.value} isHeld={dieObj.isHeld} hold={hold} id={dieObj.id} />);

  return (
    <main>
      {gameWon && <ReactConfetti/>}
         <h1 className="title">Tenzies</h1>
         <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
            {diceElements}
        </div>
        
        <button className='roll-dice' onClick={rollDice}>
          {gameWon ? "New Game" : "Roll"}
        </button>
    </main>
  );
}

export default App;
