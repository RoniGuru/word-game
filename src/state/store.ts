import { configureStore } from '@reduxjs/toolkit';

import { saveToLocalStorage } from './middleware/saveToLocalStorage';
import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveToLocalStorage),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
