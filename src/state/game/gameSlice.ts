import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { words, WordCategories } from '../../data/words';
interface gameData {
  on: boolean;
  start: boolean;
  end: boolean;
  highScore: number;
  score: number;
  lives: number;
  category: string;
  solved: string[];
  word: string;
  key: string;
}

interface gameState {
  gameState: gameData;
}

export const initialState: gameState = {
  gameState: {
    on: false,
    start: false,
    end: false,
    highScore: localStorage.getItem('highScore')
      ? Number(localStorage.getItem('highScore'))
      : 0,

    score: 0,
    lives: 5,
    category: '',
    solved: [],
    word: '',
    key: '',
  },
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    turnOnOff: (state, action: PayloadAction<boolean>) => {
      state.gameState.on = action.payload;
    },

    startGame: (state) => {
      state.gameState.start = true;
      state.gameState.end = false;
      state.gameState.key = '';
      state.gameState.score = 0;
    },
    endGame: (state) => {
      state.gameState.lives = 5;
      state.gameState.start = false;
      state.gameState.end = true;
    },
    checkWord: (state) => {
      let temp: string[] = state.gameState.solved;
      let present = false;
      for (let i = 0; i < state.gameState.word.length; i++) {
        if (state.gameState.word[i] === state.gameState.key.toLowerCase()) {
          temp[i] = state.gameState.key.toLowerCase();

          present = true;
        }
      }
      state.gameState.solved = temp;
      if (!present) {
        state.gameState.lives = state.gameState.lives - 1;
      }
    },
    pickRandomWord: (state) => {
      const categories = Object.keys(words) as (keyof WordCategories)[];
      let randCategory =
        categories[Math.floor(Math.random() * categories.length)];
      state.gameState.category = String(randCategory);

      const randomWord =
        words[randCategory][
          Math.floor(Math.random() * words[randCategory].length)
        ];
      state.gameState.word = randomWord;
    },
    createSolved: (state) => {
      let array = [];
      let random = 0;
      let emptyCount =
        state.gameState.word.length -
        Math.floor(state.gameState.word.length / 3);
      for (let i = 0; i < state.gameState.word.length; i++) {
        random = Math.floor(Math.random() * 100);
        if (random >= 70 && emptyCount != 0) {
          array.push(state.gameState.word[i]);
          emptyCount--;
        } else {
          array.push('_');
        }
      }
      state.gameState.solved = array;
    },

    updateScore: (state, action: PayloadAction<number>) => {
      state.gameState.score = action.payload;
      if (action.payload > state.gameState.highScore) {
        localStorage.setItem('highScore', String(state.gameState.score));
        state.gameState.highScore = action.payload;
      }
    },
    setKey: (state, action: PayloadAction<string>) => {
      state.gameState.key = action.payload;
    },
  },
});

export const {
  startGame,
  endGame,
  checkWord,
  pickRandomWord,
  createSolved,
  setKey,
  updateScore,
  turnOnOff,
} = gameSlice.actions;
export default gameSlice.reducer;
