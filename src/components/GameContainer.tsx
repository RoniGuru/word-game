import { FaHeart } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../state/store';
import {
  endGame,
  createSolved,
  setKey,
  checkWord,
  updateScore,
  startGame,
} from '../state/game/gameSlice';

export default function GameContainer() {
  const [time, setTime] = useState<number>(60);
  const game = useSelector((state: RootState) => state.game.gameState);

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

  const dispatch = useDispatch<AppDispatch>();

  const [bootAnimation, setBootAnimation] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<string>('');
  const bootText = 'loading...';

  useEffect(() => {
    if (game.start) {
      setBootAnimation(true);
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < bootText.length) {
          setLoadingText(bootText.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          setTimeout(() => {
            setBootAnimation(false);
          }, 1000);
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    if (game.word) {
      dispatch(createSolved());
    }
  }, [game.word]);

  useEffect(() => {
    dispatch(checkWord());
    let solvedWord = game.solved.join('');

    if (solvedWord === game.word) {
      dispatch(updateScore(game.score + 1));

      dispatch(startGame());
    }
  }, [game.word, game.key, game.solved]);

  function isAlphabet(key: string): boolean {
    return /^[A-Za-z]$/.test(key);
  }

  const handleKeyPress = async (event: KeyboardEvent) => {
    if (isAlphabet(event.key)) {
      dispatch(setKey(event.key));
    }

    if (event.key === 'Enter' && game.key.length === 1) {
      dispatch(checkWord());
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

  return (
    <div
      className={`gameContainer flex flex-col justify-between  ${
        game.isAnimating ? 'turnOn' : 'turnOff'
      }  ${game.start ? 'visible' : 'invisible'}`}
    >
      {bootAnimation ? (
        <div>{loadingText}</div>
      ) : (
        <>
          <div className="flex flex-row justify-between text-center ">
            <div className="text-4xl w-1/3" data-testid="score">
              score: {game.score} highScore: {game.highScore}
            </div>
            <div className="text-8xl  w-1/3" data-testid="time">
              {time}
            </div>
            <div className="text-4xl w-1/3 flex flex-row gap-5 justify-center">
              {Array.from({ length: game.lives }, (_, index) => (
                <FaHeart key={index} data-testid="heart-icon" />
              ))}
            </div>
          </div>
          <div className=" h-1/2d">
            <div className="text-6xl" data-testid="category">
              {game.category}
            </div>
            {process.env.NODE_ENV === 'development' ? (
              <div>{game.word}</div>
            ) : null}

            <div className="flex flex-row gap-5 justify-center ">
              {game.solved.map((letter, index) => (
                <div className="text-8xl" key={index} data-testid="letter">
                  {letter}
                </div>
              ))}
            </div>
            <div className="text-8xl h-1/8 w-1/8 bg-blue-50">{game.key} </div>
          </div>
        </>
      )}
    </div>
  );
}
