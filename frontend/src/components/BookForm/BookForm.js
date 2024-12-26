import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook } from "../../redux/Books/ActionCreators";
import { v4 as uuidv4 } from "uuid";
import booksData from "../../data/books.json";
import "./BookForm.css";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const dispatch = useDispatch();

  const handleAddRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = booksData[randomIndex];

    const randomBookWithId = {
      //create new object and add id to the chosen book
      ...randomBook,
      id: uuidv4(),
    };
    dispatch(addBook(randomBookWithId)); // add book to library
    //console.log(randomIndex);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && author) {
      //send(dispatch) action to redux store
      const book = {
        title,
        author,
        id: uuidv4(),
      };

      dispatch(addBook(book));

      setTitle("");
      setAuthor("");
    }
  };

  return (
    <div className="app-block book-form">
      <h2>Add a new Book</h2>
      <form onSubmit={handleSubmit}>
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
