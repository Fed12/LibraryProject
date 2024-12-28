import "./BookList.css";
import { deleteBook, toggleFavorite } from "../../redux/Books/ActionCreators";
import { useDispatch, useSelector } from "react-redux";
import { BsBookmark, BsBookmarkHeart } from "react-icons/bs";
import {
  selectTitleFilter,
  selectAuthorFilter,
} from "../../redux/slices/FilterSlice";

export default function BookList() {
  const books = useSelector((state) => state.books); //subscribe component to state;
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const dispatch = useDispatch();

  const handleDeleteBook = (idToDelete) => {
    dispatch(deleteBook(idToDelete));
  };

  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id));
  };

  const filteredBooks = books.filter((book) => {
    const matchesTitle = (book.title || "")
      .toLowerCase()
      .includes(titleFilter.toLowerCase());
    const matchesAuthor = (book.author || "")
      .toLowerCase()
      .includes(authorFilter.toLowerCase());
    return matchesTitle && matchesAuthor;
  });

  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {filteredBooks.length === 0 ? (
        <p>No books available for provided Filters</p>
      ) : (
        <ul>
          {filteredBooks.map((book, i) => (
            <li key={book.id}>
              <div className="book-info">
                {" "}
                Book:{" "}
                <strong>
                  {book.title}
                  <br></br>{" "}
                </strong>{" "}
                Author: <strong>{book.author}</strong>
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
