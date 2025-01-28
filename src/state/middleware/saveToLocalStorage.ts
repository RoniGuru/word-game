import { Middleware } from '@reduxjs/toolkit';

export const saveToLocalStorage: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  try {
    const currentState = store.getState();

    const wordBanksState = currentState.wordBank;

    localStorage.setItem('wordBanks', JSON.stringify(wordBanksState));
  } catch (e) {
    console.error('Failed to save wordBanks to localStorage:', e);
  }

  return result;
};
