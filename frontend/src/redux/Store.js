import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/FilterSlice";
import booksReducer from "./slices/BooksSlice";
import errorReducer from "./slices/ErrorSlice";

const store = configureStore({
  reducer: {
    books: booksReducer,
    filter: filterReducer,
    error: errorReducer,
  },
});

export default store;
