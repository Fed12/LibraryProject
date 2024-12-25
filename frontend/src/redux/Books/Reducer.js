import * as a from "./ActionTypes";

const initialState = [
  { author: "Agata", title: "Love and Death" },
  { author: "Agata", title: "Puaro" },
];

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case a.ADD_Book:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default booksReducer;
