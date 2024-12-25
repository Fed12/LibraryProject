import * as a from "./ActionTypes";

export const addBook = (newBook) => {
  return {
    type: a.ADD_Book,
    payload: newBook,
  };
};
