import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import createBookWithID from "../../utils/createBookWithID";
import { setError } from "./ErrorSlice";

export interface BookBase {
  title: string;
  author: string;
  year: number;
}

export interface BookWithId extends BookBase {
  source: string;
  id: string;
  isFavorite: boolean;
}

export interface BookState {
  books: BookWithId[];
  isLoadingViaAPI: boolean;
}

const initialState: BookState = {
  books: [],
  isLoadingViaAPI: false,
};

export const fetchBook = createAsyncThunk(
  "books/fetchBook",
  async (url: string, thunkAPI) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error: any) {
      thunkAPI.dispatch(setError(error.message));
      return thunkAPI.rejectWithValue(error); // causes rejected
    }
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<BookWithId>) => {
      state.books.push(action.payload);
    },
    deleteBook: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const book = state.books.find((book) => book.id === action.payload);
      if (book) {
        book.isFavorite = !book.isFavorite;
      }
    },
  },
  extraReducers: (builder) => {
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

export const { addBook, deleteBook, toggleFavorite } = bookSlice.actions;
export const selectBooks = (state: { books: BookState }) => state.books.books;
export const selectIsLoadingViaAPI = (state: { books: BookState }) =>
  state.books.isLoadingViaAPI;
export default bookSlice.reducer;
