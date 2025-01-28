import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../state/store';
import { startGame } from '../state/game/gameSlice';
export default function Menu() {
  const game = useSelector((state: RootState) => state.game.gameState);
  const wordBank = useSelector((state: RootState) => state.wordBank);
  const [bootAnimation, setBootAnimation] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const [loadingText, setLoadingText] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const bootText = 'loading...';

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

  return (
    <div className="menu ">
      <div className="min-h-full h-full">
        {bootAnimation ? (
          <div>{loadingText}</div>
        ) : (
          <div className="min-h-full flex justify-center items-center flex-col gap-16 ">
            <div>{selectedCategory}</div>
            <select
              className="categorySelect text-3xl"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {Object.keys(wordBank).map((category) => (
                <option value={category}>{category}</option>
              ))}
            </select>
            {game.end ? (
              <>
                <div className="text-6xl">You got a score of {game.score}</div>
                <button
                  onClick={() => dispatch(startGame())}
                  className="menuButton w-1/6"
                >
                  play the game again
                </button>
              </>
            ) : (
              <button
                onClick={() => dispatch(startGame())}
                className="menuButton w-1/6"
              >
                start the game
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
