import logo from './logo.svg';
import './App.css';
import Die from './Die';
import { useEffect, useRef, useState } from 'react';
import {nanoid} from 'nanoid';
import ReactConfetti from 'react-confetti';
function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());
  const [die, setDie] = useState({});
  const ref = useRef(null);

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
                  // value: Math.ceil(Math.random() * 6),
                  value: 5,
                  isHeld: false,
                  id: nanoid()
                }));
  }

  function rollDice() {
    if (!gameWon) {
        setDice(prevDice => prevDice.map(die => die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)}));
    } else {
        setDice(generateAllNewDice());
    }
    
  }

  const hold = (id) => {
      setDice(prevDice => prevDice.map(die => die.id === id ? ({...die, isHeld: !die.isHeld}) : die));
  }

  const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value);

  const diceElements = dice.map(dieObj => <Die key={dieObj.id} value={dieObj.value} isHeld={dieObj.isHeld} hold={hold} id={dieObj.id} />);

  useEffect(() => {
    if (gameWon)
      ref.current.focus();
  }, [gameWon])
  return (
    <main>
      {gameWon && <ReactConfetti/>}
          <div aria-live='polite' className='sr-only'>
            {gameWon && <p>Congratulations! You woon! Press "New Game" to start again</p>}
          </div>
         <h1 className="title">Tenzies</h1>
         <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
            {diceElements}
        </div>
        
        <button className='roll-dice' onClick={rollDice} ref={ref}>
          {gameWon ? "New Game" : "Roll"}
        </button>
    </main>
  );
}

export default App;
