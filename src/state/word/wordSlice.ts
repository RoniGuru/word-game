import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type wordBanksState = {
  [category: string]: string[];
};

const basic: wordBanksState = {
  colors: [
    'red',
    'blue',
    'green',
    'yellow',
    'purple',
    'orange',
    'pink',
    'black',
    'white',
    'gray',
    'brown',
    'gold',
    'silver',
    'cyan',
    'magenta',
  ],

  animals: [
    'cat',
    'dog',
    'fish',
    'bird',
    'bear',
    'mouse',
    'monkey',
    'rabbit',
    'elephant',
    'tiger',
    'lion',
    'giraffe',
    'zebra',
    'kangaroo',
    'penguin',
  ],

  food: [
    'pizza',
    'burger',
    'sushi',
    'pasta',
    'salad',
    'steak',
    'taco',
    'bread',
    'cheese',
    'apple',
    'banana',
    'orange',
    'grape',
    'chocolate',
    'icecream',
  ],

  cities: [
    'Paris',
    'Tokyo',
    'London',
    'NewYork',
    'Berlin',
    'Sydney',
    'Moscow',
    'Dubai',
    'Rome',
    'Toronto',
    'Beijing',
    'Mumbai',
    'Cairo',
    'Seoul',
    'MexicoCity',
  ],

  sports: [
    'soccer',
    'basketball',
    'tennis',
    'baseball',
    'golf',
    'volleyball',
    'cricket',
    'rugby',
    'hockey',
    'swimming',
    'boxing',
    'cycling',
    'running',
    'skiing',
    'surfing',
  ],
};

const loadStateFromLocalStorage = (): wordBanksState => {
  try {
    const serializedState = localStorage.getItem('wordBanks');
    console.log(serializedState);
    if (serializedState === null) {
      return basic;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn('Failed to load state from localStorage', e);
    return basic;
  }
};

const initialState: wordBanksState = loadStateFromLocalStorage();

// Create the slice
const wordBanksSlice = createSlice({
  name: 'wordBanks',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<string>) => {
      state[action.payload] = [];
    },

    addWordToBank: (
      state,
      action: PayloadAction<{ category: string; word: string }>
    ) => {
      const { category, word } = action.payload;
      if (state[category]) {
        state[category].push(word);
      }
    },

    removeCategory: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      delete state[category];
    },

    removeWordFromBank: (
      state,
      action: PayloadAction<{ category: string; word: string }>
    ) => {
      const { category, word } = action.payload;

      if (state[category]) {
        state[category] = state[category].filter((w) => w !== word);
      }
    },
  },
});

// Export the actions
export const {
  addCategory,
  addWordToBank,
  removeCategory,
  removeWordFromBank,
} = wordBanksSlice.actions;

// Export the reducer
export default wordBanksSlice.reducer;
