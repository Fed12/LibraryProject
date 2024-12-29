import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook } from "../../redux/slices/BooksSlice";
import booksData from "../../data/books.json";
import "./BookForm.css";
import createBookWithID from "../../utils/createBookWithID";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const dispatch = useDispatch();

  const handleAddRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = booksData[randomIndex];
    dispatch(addBook(createBookWithID(randomBook)));
  };

  const handleAddBook = (e) => {
    e.preventDefault();

    if (title && author) {
      //send(dispatch) action to redux store
      dispatch(addBook(createBookWithID({ title, author })));
      setTitle("");
      setAuthor("");
    }
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
      </form>
    </div>
  );
};

export default BookForm;
