import { createSlice } from '@reduxjs/toolkit';

// This slice manages an array of favorite notes directly (state is an array)
const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    addNote: (state, action) => {
      const exists = state.some((note) => note.id === action.payload.id);
      if (!exists) {
        state.push(action.payload);
      }
    },
    removeNote: (state, action) => {
      return state.filter((note) => note.id !== action.payload.id);
    },
    clearFavorites: () => {
      return [];
    },
  },
});

export const { addNote, removeNote, clearFavorites } = favoriteSlice.actions;
export const selectFavorites = (state) => state.favorites;

export default favoriteSlice.reducer;
