import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "./supabaseClient";

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async (userId) => {
  const { data, error } = await supabase.from("notes").select("*").eq("user_id", userId);
  if (error) throw new Error(error.message);
  return data;
});

const noteSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const selectAllNotes = (state) => state.notes.notes;
export const selectIsLoading = (state) => state.notes.isLoading;
export const selectError = (state) => state.notes.error;

export default noteSlice.reducer;
