import axios from 'axios'
const AUTH_START = "AUTH_START";
const AUTH_SUCCESS = "AUTH_SUCCESS";
const AUTH_FAIL = "AUTH_FAIL";

export const auth = (email, password, isSignup) => {
  return async (dispatch) => {
    dispatch(authStart())
    try {
      const key = "AIzaSyD94xc-bO8ahc9o8hfLWu7YbBpN3fcEBbo";
      let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;
      if (!isSignup) {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`;
      }
      const response = await axios.post(url, {
        email,
        password,
        returnSecureToken: true,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
};

const authStart = () => {
  return {
    type: AUTH_START,
  };
};
const authSuccess = () => {
  return {
    type: AUTH_SUCCESS,
  };
};
const authFail = () => {
  return {
    type: AUTH_FAIL,
  };
};

export { AUTH_START, AUTH_SUCCESS, AUTH_FAIL };
