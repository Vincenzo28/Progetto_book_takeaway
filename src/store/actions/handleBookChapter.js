import axios from "axios";

const FETCH_BOOK_CHAPTERS = "FETCH_BOOK_CHAPTERS";
const CREATE_NEW_TAKEAWAYS = "CREATE_NEW_TAKEAWAYS";

const FETCH_CHAPTERS_DATA_START = "FETCH_CHAPTERS_DATA_START";
const FETCH_CHAPTERS_DATA_SUCCESS = "FETCH_CHAPTERS_DATA_SUCCESS";
const FETCH_CHAPTERS_DATA_FAIL = "FETCH_CHAPTERS_DATA_FAIL";

const CREATE_NEW_CHAPTER_START = "CREATE_NEW_CHAPTER";
const CREATE_NEW_CHAPTER_SUCCESS = "CREATE_NEW_CHAPTER_SUCCESS";
const CREATE_NEW_CHAPTER_FAIL = "CREATE_NEW_CHAPTER_FAIL";

const FETCH_BOOK_TAKEAWAYS_START = "FETCH_BOOK_TAKEAWAYS_START";
const FETCH_BOOK_TAKEAWAYS_SUCCESS = "FETCH_BOOK_TAKEAWAYS_SUCCESS";
const FETCH_BOOK_TAKEAWAYS_FAIL = "FETCH_BOOK_TAKEAWAYS_FAIL";

const CREATE_TAKEAWAYS_START = "CREATE_TAKEAWAYS_START";
const CREATE_TAKEAWAYS_SUCCESS = "CREATE_TAKEAWAYS_SUCCESS";
const CREATE_TAKEAWAYS_FAIL = "CREATE_TAKEAWAYS_FAIL";

export const fetchChaptersData = (bookKey) => {
  return async (dispatch) => {
    dispatch(fetchChaptersDataStart());
    try {
      const response = await axios.get(
        `https://booktakeaway-d84a3-default-rtdb.firebaseio.com//booksData/${bookKey}/chapters.json`
      );
      const myData = await response.data;
      const chapterList = [];
      for (let key in myData) {
        chapterList.push(key);
      }
      dispatch(fetchChaptersDataSuccess(chapterList));
    } catch (error) {
      console.log(error);
      dispatch(fetchChaptersDataFail(error));
    }
  };
};

const fetchChaptersDataStart = () => {
  return {
    type: FETCH_CHAPTERS_DATA_START,
  };
};
const fetchChaptersDataSuccess = (chapterList) => {
  return {
    type: FETCH_CHAPTERS_DATA_SUCCESS,
    chapterList,
  };
};
const fetchChaptersDataFail = (error) => {
  return {
    type: FETCH_CHAPTERS_DATA_FAIL,
    error,
  };
};

export const createNewChapter = (bookKey, inputText) => {
  return async (dispatch) => {
    dispatch(createNewChapterStart());
    try {
      const response = await axios.post(
        `https://booktakeaway-d84a3-default-rtdb.firebaseio.com//booksData/${bookKey}/chapters.json`,
        [inputText]
      );
      //   setInputText("");
      dispatch(createNewChapterSuccess(response.data.name));
    } catch (error) {
      console.log(error);
      dispatch(createNewChapterFail(error));
    }
  };
};
const createNewChapterStart = () => {
  return {
    type: CREATE_NEW_CHAPTER_START,
  };
};
const createNewChapterSuccess = (newChapter) => {
  return {
    type: CREATE_NEW_CHAPTER_SUCCESS,
    newChapter,
  };
};
const createNewChapterFail = (error) => {
  return {
    type: CREATE_NEW_CHAPTER_FAIL,
    error,
  };
};

export const fetchBookTakeaways = (bookKey, chapterKey) => {
  return async (dispatch) => {
    dispatch(fetchBookTakeawaysStart());
    try {
      const takeAwaysData = await axios.get(
        `https://booktakeaway-d84a3-default-rtdb.firebaseio.com//booksData/${bookKey}/chapters/${chapterKey}.json`
      );
      //   setTakeAwayList(takeAwaysData.data);
      dispatch(fetchBookTakeawaysSuccess(takeAwaysData.data));
    } catch (error) {
      console.log(error);
      dispatch(fetchBookTakeawaysFail(error));
    }
  };
};
const fetchBookTakeawaysStart = () => {
  return {
    type: FETCH_BOOK_TAKEAWAYS_START,
  };
};
const fetchBookTakeawaysSuccess = (takeAwaysData) => {
  return {
    type: FETCH_BOOK_TAKEAWAYS_SUCCESS,
    takeAwaysData,
  };
};
const fetchBookTakeawaysFail = (error) => {
  return {
    type: FETCH_BOOK_TAKEAWAYS_FAIL,
    error,
  };
};

export const createTakeaways = (bookKey, chapterKey, inputText) => {
  return async (dispatch, getState) => {
    dispatch(createTakeawaysStart());
    const takeAwayList = getState().chapterReducer.takeAwayList;
    try {
      const response = await axios.put(
        `https://booktakeaway-d84a3-default-rtdb.firebaseio.com//booksData/${bookKey}/chapters/${chapterKey}.json`,
        [...takeAwayList, inputText]
      );
      // aggiornare lo state dell'app con il nuovo takeaway
      dispatch(createTakeawaysSuccess(inputText));

      // codice per fetchare i nuovi dati da firebase
      // await fetchBookTakeaway()
    } catch (error) {
      console.log(error);
      dispatch(createTakeawaysFail(error));
    }
  };
};
const createTakeawaysStart = () => {
  return {
    type: CREATE_TAKEAWAYS_START,
  };
};
const createTakeawaysSuccess = (inputText) => {
  return {
    type: CREATE_TAKEAWAYS_SUCCESS,
    inputText,
  };
};
const createTakeawaysFail = (error) => {
  return {
    type: CREATE_TAKEAWAYS_FAIL,
    error,
  };
};

export {
  FETCH_BOOK_CHAPTERS,
  CREATE_NEW_TAKEAWAYS,
  FETCH_CHAPTERS_DATA_START,
  FETCH_CHAPTERS_DATA_SUCCESS,
  FETCH_CHAPTERS_DATA_FAIL,
  CREATE_NEW_CHAPTER_START,
  CREATE_NEW_CHAPTER_SUCCESS,
  CREATE_NEW_CHAPTER_FAIL,
  FETCH_BOOK_TAKEAWAYS_START,
  FETCH_BOOK_TAKEAWAYS_SUCCESS,
  FETCH_BOOK_TAKEAWAYS_FAIL,
  CREATE_TAKEAWAYS_START,
  CREATE_TAKEAWAYS_SUCCESS,
  CREATE_TAKEAWAYS_FAIL,
};
