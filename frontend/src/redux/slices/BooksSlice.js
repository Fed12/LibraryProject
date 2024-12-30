import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import createBookWithID from "../../utils/createBookWithID";
import { setError } from "./ErrorSlice";

const initialState = {
  books: [],
  isLoadingViaAPI: false,
}; //initial book array

export const fetchBook = createAsyncThunk(
  "books/fetchBook",
  async (url, thunkAPI) => {
    //return book data from a remote server
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      thunkAPI.dispatch(setError(error.message));
      return thunkAPI.rejectWithValue(error); // causes rejected
    }
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState: initialState,
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload); //push new book
    },
    deleteBook: (state, action) => {
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      }; //delete book by id
    },
    toggleFavorite: (state, action) => {
      state.books.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavorite = !book.isFavorite;
        }
      });
    },
  },
  extraReducers: (builder) => {
    //integrate fetchBook into Slice
    builder.addCase(fetchBook.pending, (state) => {
      state.isLoadingViaAPI = true;
    });
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      state.isLoadingViaAPI = false;
      if (action.payload.title && action.payload.author) {
        state.books.push(createBookWithID(action.payload, "API"));
      }
    });
    builder.addCase(fetchBook.rejected, (state) => {
      state.isLoadingViaAPI = false;
    });
  },
});

export const { addBook, deleteBook, toggleFavorite } = bookSlice.actions; // the actions are generated here
export const selectBooks = (state) => state.books.books;
export const selectIsLoadingViaAPI = (state) => state.books.isLoadingViaAPI;
export default bookSlice.reducer;
