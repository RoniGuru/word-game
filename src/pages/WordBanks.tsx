import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../state/store';
import { useState } from 'react';
import {
  removeWordFromBank,
  addWordToBank,
  addCategory,
  removeCategory,
} from '../state/word/wordSlice';
import { useNavigate } from 'react-router-dom';

export default function WordBankPage() {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [newWord, setNewWord] = useState('');
  const [name, setName] = useState('');

  const wordBanks = useSelector((state: RootState) => state.wordBank);
  const dispatch = useDispatch<AppDispatch>();

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

  function handleWordRemoval(word: string) {
    dispatch(removeWordFromBank({ category: currentCategory, word }));
  }

  function handleAddWord(word: string) {
    if (word.length !== 0) {
      dispatch(addWordToBank({ category: currentCategory, word }));
      setNewWord('');
    }
  }

  function handleCreateWordBank(name: string) {
    if (name.length !== 0) {
      dispatch(addCategory(name));
      setName('');
    }
  }

  function handleDeleteWordBank() {
    dispatch(removeCategory(currentCategory));
  }

  return (
    <div className="gameContainer flex  flex-col items-center gap-4 ">
      <button onClick={() => navigate('/')} className="hoverStyle w-1/6">
        Go Back
      </button>
      <div className="flex  flex-col mt-10 w-1/6">
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder=""
          className="textInput text-center w-full"
        />
        <button
          onClick={() => handleCreateWordBank(name)}
          className="hoverStyle "
        >
          Create Word Bank
        </button>
      </div>
      <div className="flex items-center justify-between w-1/6 ">
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
      <button onClick={handleDeleteWordBank} className=" hoverStyle w-1/6">
        delete {currentCategory}
      </button>
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
      <div className="flex  flex-col w-1/6">
        <input
          onChange={(e) => setNewWord(e.target.value)}
          value={newWord}
          placeholder="new word"
          className="textInput text-center"
        />
        <button onClick={() => handleAddWord(newWord)} className="hoverStyle">
          Add Word
        </button>
      </div>
      <button
        onClick={() => setDeleting(!deleting)}
        className={`w-1/6 hoverStyle ${deleting ? 'highlighted' : ''}`}
      >
        Set Deleting Words
      </button>
    </div>
  );
}
