import {
  USER_LOGIN_ERROR,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_SIGN_UP,
  USER_NAME,
} from './auth.actionTypes';

export const loginRequest = () => ({
  type: USER_LOGIN_REQUEST,
});

export const loginSuccess = (payload) => ({
  type: USER_LOGIN_SUCCESS,
  payload, // Ensure payload is an object with an authToken
});

export const loginError = (error) => ({
  type: USER_LOGIN_ERROR,
  payload: { error }, // Wrap error in an object if needed
});

export const logout = () => ({
  type: USER_LOGOUT,
});

export const signUp = (payload) => ({
  type: USER_SIGN_UP,
  payload, // Ensure payload is an object with an authToken
});

export const getUserName = (payload) => ({
  type: USER_NAME,
  payload, // Ensure payload is a string (userName)
});
