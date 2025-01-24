import gameSliceReducer from './game/gameSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({ reducer: { game: gameSliceReducer } });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
