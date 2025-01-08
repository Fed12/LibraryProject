import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/FilterSlice";
import booksReducer from "./slices/BooksSlice";
import errorReducer from "./slices/ErrorSlice";

// Define the root state type
export type RootState = ReturnType<typeof store.getState>;

// Define the App Dispatch type
export type AppDispatch = typeof store.dispatch;

// Create the Redux store
const store = configureStore({
  reducer: {
    books: booksReducer,
    filter: filterReducer,
    error: errorReducer,
  },
});

// Export the store
export default store;
