import { useState, useEffect, useCallback } from 'react';
import { WordCategories, words } from '../data/words';
import { FaHeart } from 'react-icons/fa';

export default function Game() {
  const [start, setStart] = useState<boolean>(false);
  const [key, setKey] = useState<string>('');
  const [time, setTime] = useState<number>(0);

  const [lives, setLives] = useState<number>(0);
  const [category, setCategory] = useState<string>('');
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
    const categories = Object.keys(words) as (keyof WordCategories)[];
    let randCategory =
      categories[Math.floor(Math.random() * categories.length)];
    setCategory(String(randCategory));

    const randomWord =
      words[randCategory][
        Math.floor(Math.random() * words[randCategory].length)
      ];
    setWord(randomWord);
  }

  function startGame() {
    pickRandomWord();
    setStart(true);
    setTime(60);
    setLives(5);
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
          <div className="gameContainer flex flex-col justify-between">
            <div className="flex flex-row justify-between text-center ">
              <div className="text-4xl w-1/3">score: {score}</div>
              <div className="text-8xl  w-1/3">{time}</div>
              <div className="text-4xl w-1/3 flex flex-row gap-5">
                {Array.from({ length: lives }, (_, index) => (
                  <FaHeart key={index} />
                ))}
              </div>
            </div>
            <div className=" h-1/2d">
              <div className="text-6xl">{category}</div>
              <div>{word}</div>
              <div className="flex flex-row gap-5 justify-center ">
                {solved.map((letter, index) => (
                  <div className="text-8xl" key={index}>
                    {letter}
                  </div>
                ))}
              </div>
            </div>
            <div className="text-8xl">{key} </div>
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
