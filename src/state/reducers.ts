import { combineReducers } from '@reduxjs/toolkit';

import gameSliceReducer from './game/gameSlice';

import wordSliceReducer from './word/wordSlice';

const rootReducer = combineReducers({
  game: gameSliceReducer,
  wordBank: wordSliceReducer,
});

export default rootReducer;
