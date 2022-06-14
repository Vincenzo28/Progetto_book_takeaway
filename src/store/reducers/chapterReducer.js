import * as actionTypes from "../actions/handleBookChapter";

const initialState = {
  chapterList: [],
  loading: false,
  error: false,
  takeAwayList: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CHAPTERS_DATA_START:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actionTypes.FETCH_CHAPTERS_DATA_SUCCESS:
      return {
        ...state,
        chapterList: action.chapterList,
        error: false,
      };
    case actionTypes.FETCH_CHAPTERS_DATA_FAIL:
      return {
        ...state,
        error: action.error,
      };
    case actionTypes.CREATE_NEW_CHAPTER_START:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actionTypes.CREATE_NEW_CHAPTER_SUCCESS:
      return {
        ...state,
        chapterList: [...state.chapterList, action.newChapter],
        error: false,
      };
    case actionTypes.CREATE_NEW_CHAPTER_FAIL:
      return {
        ...state,
        error: action.error,
      };
    case actionTypes.FETCH_BOOK_TAKEAWAYS_START:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actionTypes.FETCH_BOOK_TAKEAWAYS_SUCCESS:
      return {
        ...state,
        takeAwayList: action.takeAwaysData,
        error: false,
        loading: false,
      };
    case actionTypes.FETCH_BOOK_TAKEAWAYS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.CREATE_TAKEAWAYS_START:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actionTypes.CREATE_TAKEAWAYS_SUCCESS:
      return {
        ...state,
        takeAwayList: [...state.takeAwayList, action.inputText],
        error: false,
        loading: false,
      };
    case actionTypes.CREATE_TAKEAWAYS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default reducer;
