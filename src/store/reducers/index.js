import { combineReducers } from "redux";
import bookReducer from "./bookReducer";
import chapterReducer from "./chapterReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  bookReducer,
  chapterReducer,
  authReducer,
});

export default rootReducer;
