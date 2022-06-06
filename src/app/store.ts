import { configureStore } from '@reduxjs/toolkit';
import compareSiteReducers from '../features';

export const store = configureStore({
  reducer: {
    compareSite: compareSiteReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
