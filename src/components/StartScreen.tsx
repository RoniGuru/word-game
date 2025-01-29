import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { useNavigate } from 'react-router-dom';

export default function StartScreen({
  playGame,
}: {
  playGame: (category: string, words: string[]) => void;
}) {
  const wordBanks = useSelector((state: RootState) => state.wordBank);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  const navigate = useNavigate();

  function goToNextCategory() {
    setCurrentCategoryIndex(
      (prevIndex) => (prevIndex + 1) % Object.keys(wordBanks).length
    );
  }
  function goToPreviousCategory() {
    setCurrentCategoryIndex((prevIndex) =>
      prevIndex === 0 ? Object.keys(wordBanks).length - 1 : prevIndex - 1
    );
  }

  const currentCategory = Object.keys(wordBanks)[currentCategoryIndex];

  return (
    <div className="flex items-center min-w-full flex-col  text-3xl ">
      <div className="flex items-center justify-between w-1/3 ">
        <button
          onClick={goToPreviousCategory}
          className="text-3xl hoverStyle w-1/3"
        >
          &larr;
        </button>
        <h2>{currentCategory}</h2>

        <button
          onClick={goToNextCategory}
          className="text-3xl hoverStyle w-1/3"
        >
          &rarr;
        </button>
      </div>
      <button
        onClick={() => playGame(currentCategory, wordBanks[currentCategory])}
        className="menuButton w-1/3"
      >
        start the game
      </button>
      <button
        onClick={() => navigate('/createWordBank')}
        className="menuButton w-1/3"
      >
        create WordBank
      </button>
    </div>
  );
}
