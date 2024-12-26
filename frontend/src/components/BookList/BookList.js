import "./BookList.css";
import { deleteBook } from "../../redux/Books/ActionCreators";
import { useDispatch, useSelector } from "react-redux";

export default function BookList() {
  const books = useSelector((state) => state.books); //subscribe component to state;
  const dispatch = useDispatch();

  const handleDeleteBook = (idToDelete) => {
    dispatch(deleteBook(idToDelete));
  };

  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {books.map((book, i) => (
            <li key={book.id}>
              <div className="book-info">
                {++i}. Book: {book.title} <br></br> Author{" "}
                <strong>{book.author}</strong>
              </div>
              <div className="book-actions">
                <button onClick={() => handleDeleteBook(book.id)}>
                  Delete this book
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
