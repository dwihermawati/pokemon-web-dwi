import { configureStore } from '@reduxjs/toolkit';
import favoritePokemonReducer from './features/favoritePokemonSlice';

const store = configureStore({
  reducer: {
    favorite: favoritePokemonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
