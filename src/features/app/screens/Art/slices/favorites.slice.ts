import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const itemInFavorites = state.favorites.find(
        item => item.id === action.payload.id,
      );
      if (!itemInFavorites) {
        state.favorites.push({
          id: action.payload.id,
          name: action.payload.name,
          photo: action.payload.photo,
        });
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        item => item.id !== action.payload,
      );
    },
  },
});

export const {addToFavorites, removeFromFavorites} = favoritesSlice.actions;

// Selector to get favorites from the state
export const selectFavorites = (state: {favorites: {favorites: any}}) =>
  state.favorites.favorites;

export default favoritesSlice.reducer;
