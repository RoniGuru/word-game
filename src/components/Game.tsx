import { useState, useEffect, useCallback } from 'react';
import { WordCategories, words } from '../data/words';
import { FaHeart } from 'react-icons/fa';
import PowerButton from './PowerButton';
import GameContainer from './GameContainer';

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
    }, 150);
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
      <div className="flex flex-col h-full w-full justify-center items-center gap-10 text-center relative ">
        {start ? (
          <GameContainer
            gameData={{
              start,
              highScore,
              isAnimating,
              score,
              time,
              lives,
              category,
              solved,
              word,
              key,
            }}
          />
        ) : (
          <div className="h-4/5 w-4/5 bg-black"></div>
        )}

        <PowerButton start={start} startGame={startGame} endGame={endGame} />
      </div>
    </div>
  );
}
