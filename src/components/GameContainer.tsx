import { FaHeart } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../state/store';
import { endGame } from '../state/game/gameSlice';

export default function GameContainer() {
  const [time, setTime] = useState<number>(60);
  const [key, setKey] = useState<string>('');
  const [lives, setLives] = useState<number>(5);
  const [randomWord, setRandomWord] = useState<string>('');

  const game = useSelector((state: RootState) => state.game.gameState);

  const [currentWords, setCurrentWords] = useState<string[]>(game.words);
  const [placeholder, setPlaceholder] = useState<string[]>([]);

  useEffect(() => {
    if (game.start && time > 0) {
      const interval = setInterval(() => {
        setTime((prevSeconds) => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (time === 0) {
      dispatch(endGame());
    }
  }, [game.start, time]);

  useEffect(() => {
    let solvedWord = placeholder.join('');

    if (solvedWord.toLowerCase() === randomWord.toLowerCase()) {
      removeWord();
      pickRandomWord();
    }
  }, [placeholder]);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (randomWord) {
      createPlaceholder();
    }
  }, [randomWord]);

  useEffect(() => {
    pickRandomWord();
  }, []);

  useEffect(() => {
    if (currentWords.length === 0) {
      dispatch(endGame());
    }
  }, [currentWords]);

  useEffect(() => {
    if (lives === 0) {
      dispatch(endGame());
    }
  }, [lives]);

  function isAlphabet(key: string): boolean {
    return /^[A-Za-z]$/.test(key);
  }

  const handleKeyPress = async (event: KeyboardEvent) => {
    if (isAlphabet(event.key)) {
      setKey(event.key);
    }

    if (event.key === 'Enter' && key.length === 1) {
      checkWord();
    }
  };

  useEffect(() => {
    if (game.start) {
      // Add event listener when component mounts
      window.addEventListener('keypress', handleKeyPress);

      // Cleanup listener when component unmounts
      return () => {
        window.removeEventListener('keypress', handleKeyPress);
      };
    }
  }, [handleKeyPress]);

  function pickRandomWord() {
    const randomIndex = Math.floor(Math.random() * currentWords.length);
    setRandomWord(currentWords[randomIndex]);
  }

  function createPlaceholder() {
    let revealCount = randomWord.length - Math.floor(randomWord.length / 3);

    let random = 0;
    let array = [];
    for (let i = 0; i < randomWord.length; i++) {
      random = Math.floor(Math.random() * 100);
      if (random >= 70 && revealCount != 0) {
        array.push(randomWord[i]);
        revealCount--;
      } else {
        array.push('_');
      }
    }
    setPlaceholder(array);
  }

  function removeWord() {
    let temp = [...currentWords];

    temp = temp.filter((word) => word !== randomWord);

    setCurrentWords(temp);
  }

  function checkWord() {
    let temp: string[] = [...placeholder];
    let present = false;
    for (let i = 0; i < randomWord.length; i++) {
      if (randomWord[i].toLowerCase() === key.toLowerCase()) {
        temp[i] = key.toLowerCase();

        present = true;
      }
    }
    setPlaceholder(temp);
    if (!present) {
      setLives((prevLives) => prevLives - 1);
    }
  }

  return (
    <div className={`gameContainer flex flex-col justify-between  `}>
      <div className="flex flex-row justify-between text-center ">
        <div className="text-8xl  w-1/3" data-testid="time">
          {time}
        </div>

        <div className="text-4xl w-1/3 flex flex-row gap-5 justify-center">
          {Array.from({ length: lives }, (_, index) => (
            <FaHeart key={index} data-testid="heart-icon" />
          ))}
        </div>
      </div>
      <div className=" h-3/4  flex flex-col justify-between">
        <div className="text-6xl" data-testid="category">
          {game.category}
        </div>
        {process.env.NODE_ENV === 'development' ? (
          <div>{randomWord}</div>
        ) : null}

        <div className="flex flex-row gap-5 justify-center ">
          {placeholder.map((letter, index) => (
            <div className="text-8xl" key={index} data-testid="letter">
              {letter}
            </div>
          ))}
        </div>
        <div className="text-8xl  ">{key || '\u00A0'}</div>
      </div>
    </div>
  );
}
