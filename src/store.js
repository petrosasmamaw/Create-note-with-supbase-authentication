import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./noteSlice";
import favoriteReducer from "./noteFavoriteSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    notes: noteReducer,
    favorites: favoriteReducer,
    auth: authReducer,
  },
});
