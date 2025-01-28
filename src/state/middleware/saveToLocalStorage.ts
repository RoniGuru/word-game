import { Middleware } from '@reduxjs/toolkit';

export const saveToLocalStorage: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState().wordBank;
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('wordBanks', serializedState);
  } catch (e) {
    console.warn('Failed to save state to localStorage', e);
  }
  return result;
};
