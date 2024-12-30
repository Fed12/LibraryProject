import { useState } from "react";
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

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isLoadingViaAPI = useSelector(selectIsLoadingViaAPI);
  const dispatch = useDispatch();

  const handleAddRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = booksData[randomIndex];
    dispatch(addBook(createBookWithID(randomBook, "random")));
  };

  const handleAddBook = (e) => {
    e.preventDefault();
    if (title && author) {
      //send(dispatch) action to redux store
      dispatch(addBook(createBookWithID({ title, author }, "manual")));
      setTitle("");
      setAuthor("");
    } else {
      dispatch(setError("Please, provide both fields: title and author"));
    }
  };

  const handleAddRandomBookViaAPI = () => {
    dispatch(fetchBook("http://localhost:4000/random-book-delayed")); //set the needed url
  };

  return (
    <div className="app-block book-form">
      <h2>Add a new Book</h2>
      <form onSubmit={handleAddBook}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="title">Author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type="submit">Add Book</button>
        <button type="button" onClick={handleAddRandomBook}>
          Add Random Book
        </button>

        <button type="button" onClick={handleAddRandomBookViaAPI}>
          {isLoadingViaAPI ? (
            <>
              <span>Loading book</span>
              <FaSpinner className="spinner" />
            </>
          ) : (
            "Add Random via API"
          )}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
