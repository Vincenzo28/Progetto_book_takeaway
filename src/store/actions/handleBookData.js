import { googleBooks, firebase } from "../../Axios";
import axios from "axios";

// const FETCH_BOOK_DATA = "FETCH_BOOK_DATA";
const FETCH_BOOK_DATA_START = "FETCH_BOOK_DATA_START";
const FETCH_BOOK_DATA_SUCCESS = "FETCH_BOOK_DATA_SUCCESS";
const FETCH_BOOK_DATA_FAIL = "FETCH_BOOK_DATA_FAIL";

const GET_SAVED_BOOKS_IDS = "GET_SAVED_BOOKS_IDS";
const ADD_BOOK = "ADD_BOOK";
const FETCH_SINGLE_BOOK = "FETCH_SINGLE_BOOK";

const FETCH_SAVED_BOOKS_START = "FETCH_SAVED_BOOKS_START";
const FETCH_SAVED_BOOKS_SUCCESS = "FETCH_SAVED_BOOKS_SUCCESS";
const FETCH_SAVED_BOOKS_FAIL = "FETCH_SAVED_BOOKS_START";

export const fetchBookData = (inputText) => {
  if (inputText.trim === "") {
    return;
  }
  return async (dispatch) => {
    dispatch(fetchBookDataStart());
    try {
      await dispatch(getSavedBooksIDs());
      const myData = await googleBooks.get(`?q=${inputText}`);
      dispatch(fetchBookDataSuccess(myData.data));
    } catch (error) {
      console.log(error);
      dispatch(fetchBookDataFail(error));
    }
  };
};

export const fetchBookDataStart = () => {
  return {
    type: FETCH_BOOK_DATA_START,
  };
};
export const fetchBookDataSuccess = (booksData) => {
  return {
    type: FETCH_BOOK_DATA_SUCCESS,
    booksData: booksData,
  };
};
export const fetchBookDataFail = (error) => {
  return {
    type: FETCH_BOOK_DATA_FAIL,
    error: error,
  };
};

export const fetchSavedBooks = () => {
  return async (dispatch) => {
    dispatch(fetchSavedBookStart());
    try {
      const response = await firebase.get();
      const bookList = [];
      for (let key in response.data) {
        // Aggiungi un oggetto contenente titolo e id nell'array da iterare
        bookList.push({
          title: response.data[key].bookTitle,
          id: response.data[key].bookId,
          key: key,
        });
      }
      dispatch(fetchSavedBooksSuccess(bookList));
    } catch (error) {
      console.log(error);
      dispatch(fetchSavedBooksFail(error));
    }
  };
};

export const fetchSavedBookStart = () => {
  return {
    type: FETCH_SAVED_BOOKS_START,
  };
};
export const fetchSavedBooksSuccess = (savedBooks) => {
  return {
    type: FETCH_SAVED_BOOKS_SUCCESS,
    savedBooks,
  };
};
export const fetchSavedBooksFail = (error) => {
  return {
    type: FETCH_SAVED_BOOKS_FAIL,
    error,
  };
};

export const getSavedBooksIDs = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "https://booktakeaway-d84a3-default-rtdb.firebaseio.com//booksData.json"
      );
      const data = response.data;
      const allIDs = [];
      for (let key in data) {
        allIDs.push(data[key].bookId);
      }
      // await setSavedIDs(allIDs);
      dispatch({ type: GET_SAVED_BOOKS_IDS, savedIDs: allIDs });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addNewBook = (id, title) => {
  return async (dispatch) => {
    try {
      const data = await firebase.post("", {
        bookId: id,
        bookTitle: title,
      });
      await dispatch(getSavedBooksIDs());
      console.log(data);
      // setLoading(false);
      // setError(false);
    } catch (error) {
      console.log(error);
      // setLoading(false);
      // setError(true);
    }
  };
};

export {
  FETCH_BOOK_DATA_START,
  FETCH_BOOK_DATA_SUCCESS,
  FETCH_BOOK_DATA_FAIL,
  FETCH_SAVED_BOOKS_START,
  FETCH_SAVED_BOOKS_SUCCESS,
  FETCH_SAVED_BOOKS_FAIL,
  GET_SAVED_BOOKS_IDS,
  ADD_BOOK,
  FETCH_SINGLE_BOOK,
};
