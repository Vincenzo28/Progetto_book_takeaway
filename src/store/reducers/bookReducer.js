import * as actionTypes from "../actions/handleBookData";

const initialState = {
  booksData: [],
  savedIDs: [],
  loading: false,
  error: false,
  savedBooks: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_BOOK_DATA_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_BOOK_DATA_SUCCESS:
      return {
        ...state,
        booksData: action.booksData,
        loading: false,
        error: false,
      };
    case actionTypes.FETCH_BOOK_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionTypes.FETCH_SAVED_BOOKS_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_SAVED_BOOKS_SUCCESS:
      return {
        ...state,
        savedBooks: action.savedBooks,
        loading: false,
        error: false,
      };
    case actionTypes.FETCH_SAVED_BOOKS_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionTypes.GET_SAVED_BOOKS_IDS:
      return {
        ...state,
        savedIDs: action.savedIDs,
      };
    default:
      return state;
  }
};

export default reducer;
