import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface gameData {
  on: boolean;
  start: boolean;
  end: boolean;

  category: string;
  words: string[];
}

interface gameState {
  gameState: gameData;
}

export const initialState: gameState = {
  gameState: {
    on: false,
    start: false,
    end: false,

    category: '',
    words: [],
  },
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    turnOnOff: (state, action: PayloadAction<boolean>) => {
      state.gameState.on = action.payload;
      if (action.payload === false) {
        state.gameState.start = false;
        state.gameState.end = false;
      }
    },

    startGame: (state) => {
      state.gameState.start = true;
      state.gameState.end = false;
    },
    endGame: (state) => {
      state.gameState.start = false;
      state.gameState.end = true;
    },

    setCategoryAndWords: (
      state,
      action: PayloadAction<{ category: string; words: string[] }>
    ) => {
      state.gameState.category = action.payload.category;
      state.gameState.words = action.payload.words;
    },
    removeWord: (state, action: PayloadAction<string>) => {
      let temp = state.gameState.words;
      temp = temp.filter((word) => word !== action.payload);
      state.gameState.words = temp;
    },
    backToStart: (state) => {
      state.gameState.end = false;
    },
  },
});

export const {
  startGame,
  endGame,
  turnOnOff,
  setCategoryAndWords,
  removeWord,
  backToStart,
} = gameSlice.actions;
export default gameSlice.reducer;
