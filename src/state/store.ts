import gameSliceReducer from './game/gameSlice';
import { configureStore } from '@reduxjs/toolkit';
import wordSliceReducer from './word/wordSlice';

export const store = configureStore({
  reducer: { game: gameSliceReducer, word: wordSliceReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
