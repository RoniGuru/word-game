import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { words, WordCategories } from '../../data/words';
interface gameData {
  start: boolean;
  highScore: number;
  isAnimating: boolean;
  score: number;
  lives: number;
  category: string;
  solved: string[];
  word: string;
  key: string;
}

export const initialState: gameData = {
  start: false,
  highScore: localStorage.getItem('highscore')
    ? Number(localStorage.getItem('highscore'))
    : 0,
  isAnimating: false,
  score: 0,
  lives: 0,
  category: '',
  solved: [],
  word: '',
  key: '',
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state) => {
      state.isAnimating = true;
      state.start = true;
      state.key = '';
    },
    endGame: (state) => {
      state.isAnimating = false;
      setTimeout(() => {
        state.start = false;

        state.score = 0;
        state.lives = 5;
      }, 150);
    },
    checkWord: (state) => {
      let temp: string[] = state.solved;
      let present = false;
      for (let i = 0; i < state.word.length; i++) {
        if (state.word[i] === state.key.toLowerCase()) {
          temp[i] = state.key.toLowerCase();

          present = true;
        }
      }
      state.solved = temp;
      if (!present) {
        state.lives = state.lives - 1;
      }
    },
    pickRandomWord: (state) => {
      const categories = Object.keys(words) as (keyof WordCategories)[];
      let randCategory =
        categories[Math.floor(Math.random() * categories.length)];
      state.category = String(randCategory);

      const randomWord =
        words[randCategory][
          Math.floor(Math.random() * words[randCategory].length)
        ];
      state.word = randomWord;
    },
    createSolved: (state) => {
      let array = [];
      let random = 0;
      let emptyCount = state.word.length - Math.floor(state.word.length / 3);
      for (let i = 0; i < state.word.length; i++) {
        random = Math.floor(Math.random() * 100);
        if (random >= 70 && emptyCount != 0) {
          array.push(state.word[i]);
          emptyCount--;
        } else {
          array.push('_');
        }
      }
      state.solved = array;
    },
    setHighScore: (state) => {
      state.highScore = state.score;
    },
    updateScore: (state, action: PayloadAction<number>) => {
      state.score = action.payload;
    },
    setKey: (state, action: PayloadAction<string>) => {
      state.key = action.payload;
    },
  },
});

export const {
  startGame,
  endGame,
  checkWord,
  pickRandomWord,
  createSolved,
  setHighScore,
} = gameSlice.actions;
export default gameSlice.reducer;
