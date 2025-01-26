import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../state/store';
import { startGame } from '../state/game/gameSlice';
export default function Menu() {
  const game = useSelector((state: RootState) => state.game.gameState);
  const [bootAnimation, setBootAnimation] = useState<boolean>(false);

  const [loadingText, setLoadingText] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const bootText = 'loading...';

  useEffect(() => {
    if (game.on) {
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

  return (
    <div className="menu ">
      <div className="min-h-full h-full">
        {bootAnimation ? (
          <div>{loadingText}</div>
        ) : (
          <div className="min-h-full flex justify-center items-center ">
            <button
              onClick={() => dispatch(startGame())}
              className="menuButton w-1/6"
            >
              start the game
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
