import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

//const initialState = { id: uuidv4(), title: "", author: "", isFavorite: false }; //initial book obj
const initialState = [];

const bookSlice = createSlice({
  name: "book",
  initialState: initialState,
  reducers: {
    addBook: (state, action) => {
      state.push(action.payload); //push new book
    },
    deleteBook: (state, action) => {
      return state.filter((book) => book.id !== action.payload); //delete book by id
    },
    toggleFavorite: (state, action) => {
      state.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavorite = !book.isFavorite;
        }
      });
      /*return state.map((book) =>
        book.id === action.payload
          ? { ...book, isFavorite: !book.isFavorite }
          : book
      );*/
    },
  },
});

export const { addBook, deleteBook, toggleFavorite } = bookSlice.actions; // generated actions
export const selectBooks = (state) => state.books;
export default bookSlice.reducer;
