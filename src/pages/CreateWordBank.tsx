import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { useState } from 'react';

export default function CreateWordBankPage() {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const wordBanks = useSelector((state: RootState) => state.wordBank);

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
  const words = wordBanks[currentCategory];
  return (
    <div className="gameContainer flex  flex-col items-center">
      <div className="flex items-center justify-between w-1/4 ">
        <button
          onClick={goToPreviousCategory}
          className="text-3xl hoverStyle w-1/6"
        >
          &larr;
        </button>
        <h2>{currentCategory}</h2>

        <button
          onClick={goToNextCategory}
          className="text-3xl hoverStyle w-1/6"
        >
          &rarr;
        </button>
      </div>
      <div className="h-1/3 bg-blue-100">
        <ul className="flex flex-row gap-2   ">
          {words.map((word, index) => (
            <button key={index} className="hoverStyle">
              {word}
            </button>
          ))}
        </ul>
      </div>

      <div>
        <div>add word</div>
        <div>create new wordBank</div>
        <div>save wordBanks</div>
        <div>delete WordBank</div>
      </div>
    </div>
  );
}
