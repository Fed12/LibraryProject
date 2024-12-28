import { createSlice } from "@reduxjs/toolkit";

const initialState = { title: "", author: "", onlyFavorite: false }; //initial filters

const filterSlice = createSlice({
  name: "filter",
  initialState: initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      state.title = action.payload.toLowerCase();
    },
    setAuthorFilter: (state, action) => {
      state.author = action.payload;
    },
    setOnlyFavoriteFilter: (state) => {
      state.onlyFavorite = !state.onlyFavorite;
    },
    resetFilters: (state) => {
      return initialState;
    },
  },
});

export const {
  setTitleFilter,
  setAuthorFilter,
  resetFilters,
  setOnlyFavoriteFilter,
} = filterSlice.actions; // generated actions
export const selectTitleFilter = (state) => state.filter.title;
export const selectAuthorFilter = (state) => state.filter.author;
export const selectOnlyFavoriteFilter = (state) => state.filter.onlyFavorite;

export const selectFilters = (state) => state.filters;
export default filterSlice.reducer;
