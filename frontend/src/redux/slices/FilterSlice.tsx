import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store"; // Adjust the import based on your project structure

interface FilterState {
  title: string;
  author: string;
  onlyFavorite: boolean;
}

const initialState: FilterState = {
  title: "",
  author: "",
  onlyFavorite: false,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setTitleFilter: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setAuthorFilter: (state, action: PayloadAction<string>) => {
      state.author = action.payload;
    },
    setOnlyFavoriteFilter: (state, action: PayloadAction<boolean>) => {
      state.onlyFavorite = action.payload; // Accepts boolean value
    },
    resetFilters: (state) => {
      state.title = "";
      state.author = "";
      state.onlyFavorite = false;
    },
  },
});

// Exporting actions
export const {
  setTitleFilter,
  setAuthorFilter,
  setOnlyFavoriteFilter,
  resetFilters,
} = filterSlice.actions;

// Selectors
export const selectTitleFilter = (state: RootState) => state.filter.title;
export const selectAuthorFilter = (state: RootState) => state.filter.author;
export const selectOnlyFavoriteFilter = (state: RootState) =>
  state.filter.onlyFavorite;

// Exporting reducer
export default filterSlice.reducer;
