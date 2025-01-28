import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../state/store';
import {
  backToStart,
  setCategoryAndWords,
  startGame,
} from '../state/game/gameSlice';
import { useNavigate } from 'react-router-dom';

export default function Menu() {
  const game = useSelector((state: RootState) => state.game.gameState);
  const wordBank = useSelector((state: RootState) => state.wordBank);
  const [bootAnimation, setBootAnimation] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const [loadingText, setLoadingText] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const bootText = 'loading...';

  const navigate = useNavigate();

  useEffect(() => {
    if (game.on && !game.end) {
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
    if (Object.keys(wordBank).length > 0) {
      setSelectedCategory(Object.keys(wordBank)[0]);
    }
  }, [wordBank]);

  function playGame() {
    dispatch(
      setCategoryAndWords({
        category: selectedCategory,
        words: wordBank[selectedCategory],
      })
    );
    dispatch(startGame());
  }

  return (
    <div className="menu ">
      <div className="min-h-full h-full">
        {bootAnimation ? (
          <div>{loadingText}</div>
        ) : (
          <div className="min-h-full flex justify-center items-center flex-col gap-16 ">
            {game.end ? (
              <>
                <div className="text-6xl">You got a score of {game.score}</div>
                <div className="flex  flex-col justify-center   text-center w-1/4 text-2xl  ">
                  <button onClick={playGame} className="menuButton ">
                    play the game again
                  </button>
                  <button
                    onClick={() => dispatch(backToStart())}
                    className="menuButton "
                  >
                    back to start
                  </button>
                </div>
              </>
            ) : (
              <>
                <select
                  className="categorySelect text-3xl"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {Object.keys(wordBank).map((category) => (
                    <option value={category} key={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <button onClick={playGame} className="menuButton w-1/6">
                  start the game
                </button>
                <button
                  onClick={() => navigate('/createWordBank')}
                  className="menuButton w-1/6"
                >
                  create WordBank
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
