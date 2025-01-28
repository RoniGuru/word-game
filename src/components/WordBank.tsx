import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../state/store';
import { useState } from 'react';
import { removeWordFromBank } from '../state/word/wordSlice';

export default function WordBank() {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const wordBanks = useSelector((state: RootState) => state.wordBank);
  const dispatch = useDispatch<AppDispatch>();

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

  function handleWordRemoval(word: string) {
    dispatch(removeWordFromBank({ category: currentCategory, word }));
  }

  return (
    <>
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

      <div className="h-1/3  w-1/2">
        <ul className="flex flex-row gap-2 flex-wrap   ">
          {deleting
            ? wordBanks[currentCategory].map((word, index) => (
                <button
                  key={index}
                  className="hoverStyle"
                  onClick={() => handleWordRemoval(word)}
                >
                  {word}
                </button>
              ))
            : wordBanks[currentCategory].map((word, index) => (
                <div key={index}>{word}</div>
              ))}
        </ul>
      </div>
      <button
        onClick={() => setDeleting(!deleting)}
        style={{
          backgroundColor: deleting ? '#2ecc71' : 'black',
          color: deleting ? 'black' : '#2ecc71',
        }}
        className="w-1/6"
      >
        setDelete
      </button>
      <button>saveWordBank</button>
      <button>resetWordBank</button>
    </>
  );
}
