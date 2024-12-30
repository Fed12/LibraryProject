import "./BookList.css";
//import { deleteBook, toggleFavorite } from "../../redux/Books/ActionCreators";
import { useDispatch, useSelector } from "react-redux";
import { BsBookmark, BsBookmarkHeart } from "react-icons/bs";
import {
  deleteBook,
  toggleFavorite,
  selectBooks,
} from "../../redux/slices/BooksSlice";
import {
  selectTitleFilter,
  selectAuthorFilter,
  selectOnlyFavoriteFilter,
} from "../../redux/slices/FilterSlice";

export default function BookList() {
  const books = useSelector(selectBooks); //subscribe component to state books;
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter);
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
    const matchesFavorite = onlyFavoriteFilter ? book.isFavorite : true;
    return matchesTitle && matchesAuthor && matchesFavorite;
  });

  const highlightMatch = (text, filter) => {
    if (!filter) return text;

    text = text || ""; // Ensure text is a string
    const regex = new RegExp(`(${filter})`, "gi"); // what filter we are looking for
    console.log(text.split(regex)); // array splitted

    return text.split(regex).map((substring, i) => {
      if (substring.toLowerCase() === filter.toLowerCase()) {
        //if substr === filter then highlight
        return (
          <span key={i} className="highlight">
            {substring}
          </span>
        );
      }
      return substring; // Return non-matching substrings as-is
    });
  };

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
                  {highlightMatch(book.title, titleFilter)}
                  <br></br>{" "}
                </strong>{" "}
                Author:{" "}
                <strong>{highlightMatch(book.author, authorFilter)}</strong>(
                {book.source})
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
