import * as action from "./ActionTypes";

export const addBook = (newBook) => {
  return {
    type: action.ADD_Book,
    payload: newBook,
  };
};

export const deleteBook = (bookIdToDelete) => {
  return {
    type: action.DELETE_Book,
    payload: bookIdToDelete,
  };
};
