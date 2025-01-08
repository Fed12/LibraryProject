import React from "react";
import "./BookList.css";
import { useDispatch, useSelector } from "react-redux";
import { BsBookmark, BsBookmarkHeart } from "react-icons/bs";
import {
  deleteBook,
  toggleFavorite,
  selectBooks,
  BookBase,
} from "../../redux/slices/BooksSlice";
import {
  selectTitleFilter,
  selectAuthorFilter,
  selectOnlyFavoriteFilter,
} from "../../redux/slices/FilterSlice";
import { BookWithId } from "../../redux/slices/BooksSlice";

const BookList: React.FC = () => {
  const books = useSelector(selectBooks) as BookWithId[];
  const titleFilter: string = useSelector(selectTitleFilter);
  const authorFilter: string = useSelector(selectAuthorFilter);
  const onlyFavoriteFilter: boolean = useSelector(selectOnlyFavoriteFilter);
  const dispatch = useDispatch();

  const handleDeleteBook = (idToDelete: string): void => {
    dispatch(deleteBook(idToDelete));
  };

  const handleToggleFavorite = (id: string): void => {
    dispatch(toggleFavorite(id));
  };

  const filteredBooks = books.filter((book: BookWithId) => {
    const matchesTitle = book.title
      .toLowerCase()
      .includes(titleFilter.toLowerCase());
    const matchesAuthor = book.author
      .toLowerCase()
      .includes(authorFilter.toLowerCase());
    const matchesFavorite = onlyFavoriteFilter ? book.isFavorite : true;
    return matchesTitle && matchesAuthor && matchesFavorite;
  });

  const highlightMatch = (text: string, filter: string) => {
    if (!filter) return [<span key={0}>{text}</span>];

    const regex = new RegExp(`(${filter})`, "gi");

    return text.split(regex).map((substring, i) => {
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={i} className="highlight">
            {substring}
          </span>
        );
      }
      return <span key={i}>{substring}</span>; // Ensure non-matching substrings are wrapped in a span
    });
  };

  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {filteredBooks.length === 0 ? (
        <p>No books available for provided filters</p>
      ) : (
        <ul>
          {filteredBooks.map((book) => (
            <li key={book.id}>
              <div className="book-info">
                Book:{" "}
                <strong>
                  {highlightMatch(book.title, titleFilter)}
                  <br />
                </strong>
                Author:{" "}
                <strong>{highlightMatch(book.author, authorFilter)}</strong> (
                {book.source})
              </div>
              <div className="book-actions">
                <span onClick={() => handleToggleFavorite(book.id)}>
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
};

export default BookList;
