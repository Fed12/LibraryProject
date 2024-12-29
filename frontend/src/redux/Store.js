import { configureStore } from "@reduxjs/toolkit";
//import booksReducer from "./Books/Reducer";
import filterReducer from "./slices/FilterSlice";
import booksReducer from "./slices/BooksSlice";

const store = configureStore({
  reducer: {
    books: booksReducer,
    filter: filterReducer,
  },
});

export default store;
