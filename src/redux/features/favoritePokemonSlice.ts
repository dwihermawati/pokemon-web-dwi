import { PokemonCardData } from '@/types/pokemon';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FavoritePokemonState = {
  items: PokemonCardData[];
};

const initialState: FavoritePokemonState = {
  items: [],
};

const favoritePokemonSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addToFavorite: (state, action: PayloadAction<PokemonCardData>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (!existingItem) {
        state.items.push(action.payload);
      }
    },
    removeFromFavorite: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToFavorite, removeFromFavorite } =
  favoritePokemonSlice.actions;

export default favoritePokemonSlice.reducer;
