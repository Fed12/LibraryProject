import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import createBookWithID from "../../utils/createBookWithID";
import { setError } from "./ErrorSlice";

const initialState = []; //initial book array

export const fetchBook = createAsyncThunk(
  "books/fetchBook",
  async (url, thunkAPI) => {
    //return book data from a remote server
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      thunkAPI.dispatch(setError(error.message));
      throw error; // causes rejected
    }
  }
);

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
  extraReducers: (builder) => {
    //integrate fetchBook into Slice
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      //executes if fetchBook.fulfilled === true
      if (action.payload.title && action.payload.author) {
        state.push(createBookWithID(action.payload, "API"));
      }
    });
    builder.addCase(fetchBook.rejected, (state, action) => {
      setError();
    });
  },
});

export const { addBook, deleteBook, toggleFavorite } = bookSlice.actions; // the actions are generated here
export const selectBooks = (state) => state.books;
export default bookSlice.reducer;
