import React, { useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addBook,
  fetchBook,
  selectIsLoadingViaAPI,
} from "../../redux/slices/BooksSlice";
import { setError } from "../../redux/slices/ErrorSlice";
import booksData from "../../data/books.json";
import "./BookForm.css";
import createBookWithID from "../../utils/createBookWithID";
import { FaSpinner } from "react-icons/fa";
import { AppDispatch, RootState } from "../../redux/Store";

const BookForm: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [year, setYear] = useState<number>();
  const isLoadingViaAPI = useSelector((state: RootState) =>
    selectIsLoadingViaAPI(state)
  );
  const dispatch: AppDispatch = useDispatch();

  const handleAddRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = booksData[randomIndex];
    dispatch(addBook(createBookWithID(randomBook, "random")));
  };

  const handleAddBookManually = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title && author && year) {
      dispatch(addBook(createBookWithID({ title, author, year }, "manual")));
      setTitle("");
      setAuthor("");
    } else {
      dispatch(setError("Please, provide both fields: title and author"));
    }
  };

  const handleAddRandomBookViaAPI = () => {
    dispatch(fetchBook("http://localhost:4000/random-book-delayed"));
  };

  return (
    <div className="app-block book-form">
      <h2>Add a new Book</h2>
      <form onSubmit={handleAddBookManually}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit">Add Book</button>
          <button type="button" onClick={handleAddRandomBook}>
            Add Random Book
          </button>
          <button type="button" onClick={handleAddRandomBookViaAPI}>
            {isLoadingViaAPI ? (
              <div className="loading-indicator">
                <FaSpinner className="spinner" />
                <span>Loading book...</span>
              </div>
            ) : (
              "Add Random via API"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
