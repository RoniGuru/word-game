import { useState, useEffect, useCallback } from 'react';
import { WordCategories, words } from '../data/words';
import { FaHeart } from 'react-icons/fa';

export default function Game() {
  const [start, setStart] = useState<boolean>(false);
  const [key, setKey] = useState<string>('');
  const [time, setTime] = useState<number>(0);

  const [lives, setLives] = useState<number>(5);
  const [category, setCategory] = useState<string>('');
  const [word, setWord] = useState<string>('');

  const [solved, setSolved] = useState<string[]>([]);

  const [score, setScore] = useState<number>(0);

  const [highScore, setHighScore] = useState<number>(0);

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let savedScore = localStorage.getItem('highScore');
    if (savedScore) {
      setHighScore(Number(savedScore));
    }
  }, []);

  useEffect(() => {
    if (word) {
      createSolved();
    }
  }, [word]);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('highScore', String(score));
    }
  }, [score]);

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

  function createSolved() {
    let array = [];
    let random = 0;
    let emptyCount = word.length - Math.floor(word.length / 3);
    for (let i = 0; i < word.length; i++) {
      random = Math.floor(Math.random() * 100);
      if (random >= 70 && emptyCount != 0) {
        array.push(word[i]);
        emptyCount--;
      } else {
        array.push('_');
      }
    }
    setSolved(array);
  }

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
    setIsAnimating(true);
    pickRandomWord();
    setStart(true);

    setTime(60);

    setKey('');
  }

  function endGame() {
    setIsAnimating(false);
    // Wait for animation to complete before resetting game state
    setTimeout(() => {
      setStart(false);
      setTime(60);
      setScore(0);
      setLives(5);
    }, 900);
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

  const handleKeyPress = async (event: KeyboardEvent) => {
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
          <div
            className={`gameContainer flex flex-col justify-between  ${
              isAnimating ? 'turnOn' : 'turnOff'
            }`}
          >
            <div className="flex flex-row justify-between text-center ">
              <div className="text-4xl w-1/3" data-testid="score">
                score: {score} highScore: {highScore}
              </div>
              <div className="text-8xl  w-1/3" data-testid="time">
                {time}
              </div>
              <div className="text-4xl w-1/3 flex flex-row gap-5">
                {Array.from({ length: lives }, (_, index) => (
                  <FaHeart key={index} data-testid="heart-icon" />
                ))}
              </div>
            </div>
            <div className=" h-1/2d">
              <div className="text-6xl" data-testid="category">
                {category}
              </div>
              {process.env.NODE_ENV === 'development' ? (
                <div>{word}</div>
              ) : null}

              <div className="flex flex-row gap-5 justify-center ">
                {solved.map((letter, index) => (
                  <div className="text-8xl" key={index} data-testid="letter">
                    {letter}
                  </div>
                ))}
              </div>
            </div>
            <div className="text-8xl">{key} </div>
          </div>
          <button
            className="startButton text-4xl w-1/12 transition duration-300 ease-in-out hover:scale-110"
            onClick={endGame}
          >
            END
          </button>
        </div>
      ) : (
        <button
          className="startButton text-4xl w-1/12 transition duration-300 ease-in-out hover:scale-110 fadeIn visible"
          onClick={() => startGame()}
        >
          START
        </button>
      )}
    </div>
  );
}
