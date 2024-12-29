import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import createBookWithID from "../../utils/createBookWithID";
const initialState = []; //initial book array

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
    },
  },
});

export const { addBook, deleteBook, toggleFavorite } = bookSlice.actions; // the actions are generated here
export const thunkFunction = async (dispatch, getState) => {
  console.log(getState());
  try {
    const res = await axios.get("http://localhost:4000/random-book");
    if (res?.data?.title && res?.data?.author) {
      dispatch(addBook(createBookWithID(res.data, "API")));
    }
  } catch (error) {
    console.log("Error fetching random book", error);
  }
  console.log(getState());
};
export const selectBooks = (state) => state.books;
export default bookSlice.reducer;
