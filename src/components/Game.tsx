import { useState, useEffect, useCallback } from 'react';
import { words } from '../data/words';

export default function Game() {
  const [start, setStart] = useState<boolean>(false);
  const [key, setKey] = useState<string>('');
  const [time, setTime] = useState<number>(0);

  const [lives, setLives] = useState<number>(0);

  const [word, setWord] = useState<string>('');

  const [solved, setSolved] = useState<string[]>([]);

  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    if (word) {
      let array = [];
      for (let i = 0; i < word.length; i++) {
        array.push('_');
      }
      setSolved(array);
    }
  }, [word]);

  useEffect(() => {
    if (start && time > 0) {
      const interval = setInterval(() => {
        setTime((prevSeconds) => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
    if (time === 0) {
      endGame();
    }
  }, [start, time]);

  function pickRandomWord() {
    let ranNum = Math.floor(Math.random() * words.length);
    setWord(words[ranNum]);
  }

  function startGame() {
    pickRandomWord();
    setStart(true);
    setTime(60);
    setLives(3);
  }

  function endGame() {
    setStart(false);
    setTime(60);
    setScore(0);
  }

  function isAlphabet(key: string): boolean {
    return /^[A-Za-z]$/.test(key);
  }

  const checkWord = useCallback(() => {
    let temp: string[] = [...solved];
    let present = false;
    for (let i = 0; i < word.length; i++) {
      if (word[i] === key.toLowerCase()) {
        temp[i] = key.toLowerCase();

        present = true;
      }
    }
    setSolved(temp);
    if (!present) {
      setLives((prevLives) => prevLives - 1);
      if (lives === 0) endGame();
    }
    let solvedWord = temp.join('');

    if (solvedWord === word) {
      setScore((prevScore) => prevScore + 1);
      startGame();
    }
  }, [word, key, solved]);

  const handleKeyPress = (event: KeyboardEvent) => {
    if (isAlphabet(event.key)) {
      setKey(event.key);
    }

    if (event.key === 'Enter' && key.length === 1) {
      checkWord();
    }
  };

  useEffect(() => {
    if (start) {
      // Add event listener when component mounts
      window.addEventListener('keypress', handleKeyPress);

      // Cleanup listener when component unmounts
      return () => {
        window.removeEventListener('keypress', handleKeyPress);
      };
    }
  }, [handleKeyPress]);

  return (
    <div className="game flex justify-center items-center">
      {start ? (
        <div className="flex flex-col h-full w-full justify-center items-center gap-10 text-center">
          <div className="gameContainer">
            <div className="flex flex-row justify-between text-center ">
              <div className="text-4xl w-1/3">score: {score}</div>
              <div className="text-8xl  w-1/3">{time}</div>
              <div className="text-4xl w-1/3">{lives}</div>
            </div>

            <div className="flex flex-row gap-5 justify-center ">
              {solved.map((letter, index) => (
                <div className="text-8xl" key={index}>
                  {letter}
                </div>
              ))}
              <div>{word}</div>
            </div>

            <div className="text-8xl">{key} this is the key</div>
          </div>
          <button className="startButton text-4xl w-1/12" onClick={endGame}>
            End
          </button>
        </div>
      ) : (
        <button
          className="startButton text-4xl w-1/12"
          onClick={() => startGame()}
        >
          START
        </button>
      )}
    </div>
  );
}
