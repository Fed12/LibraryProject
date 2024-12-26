import "./BookList.css";
import { deleteBook, toggleFavorite } from "../../redux/Books/ActionCreators";
import { useDispatch, useSelector } from "react-redux";
import { BsBookmark, BsBookmarkHeart } from "react-icons/bs";

export default function BookList() {
  const books = useSelector((state) => state.books); //subscribe component to state;
  const dispatch = useDispatch();

  const handleDeleteBook = (idToDelete) => {
    dispatch(deleteBook(idToDelete));
  };

  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id));
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
                {" "}
                Book: <strong>{book.title}</strong> <br></br> Author:{" "}
                <strong>{book.author}</strong>
              </div>
              <div className="book-actions">
                <span onClick={() => handleToggleFavorite(book.id)}>
                  {" "}
                  {book.isFavorite ? (
                    <BsBookmarkHeart className="star-icon" />
                  ) : (
                    <BsBookmark className="star-icon" />
                  )}
                </span>

                <button onClick={() => handleDeleteBook(book.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
