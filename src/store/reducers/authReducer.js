import * as actionTypes from "../actions/handleAuth";

const initialState = {
    loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true, 
      };
      default:
          return state
    }
}


export default reducer