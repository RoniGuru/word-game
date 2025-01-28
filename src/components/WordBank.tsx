import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../state/store';
import { useState } from 'react';
import { removeWordFromBank, addWordBank } from '../state/word/wordSlice';

export default function WordBank() {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const wordBanks = useSelector((state: RootState) => state.wordBank);
  const dispatch = useDispatch<AppDispatch>();
  const [newWord, setNewWord] = useState('');

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

  function handleAddWord(word: string) {
    if (word.length !== 0) {
      dispatch(addWordBank({ category: currentCategory, word }));
    }
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
      <div className="flex  flex-col">
        <input
          onChange={(e) => setNewWord(e.target.value)}
          value={newWord}
          placeholder="new word"
          className="textInput"
        />
        <button onClick={() => handleAddWord(newWord)} className="hoverStyle">
          Add Word
        </button>
      </div>

      <div className="h-1/3  w-1/2 wordsContainer">
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
    </>
  );
}
