import { v4 as uuidv4 } from "uuid";
import { BookBase, BookWithId } from "../redux/slices/BooksSlice";

// Function to create a book with a unique ID
const createBookWithID = (book: BookBase, source: string): BookWithId => {
  return {
    ...book,
    isFavorite: false,
    source: source,
    id: uuidv4(),
  };
};

export default createBookWithID;
