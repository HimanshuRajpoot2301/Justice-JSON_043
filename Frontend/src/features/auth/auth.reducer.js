import {
  USER_LOGIN_ERROR,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_SIGN_UP,
  USER_NAME,
} from './auth.actionTypes';
import { updateValue } from '../../Utils/LocalStorage';
import { initialState } from './auth.constants';

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOGIN_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    }
    case USER_LOGIN_SUCCESS: {
      const token = payload.authToken || ''; // Ensure payload.authToken is a string
      updateValue('userToken', token);
      return {
        ...state,
        isUserLoggedIn: true,
        isLoading: false,
        error: false,
        userToken: token,
      };
    }
    case USER_LOGIN_ERROR: {
      // Handle case where payload might not have authToken
      return {
        ...state,
        isUserLoggedIn: false,
        isLoading: false,
        error: true,
      };
    }
    case USER_LOGOUT: {
      updateValue('userToken', '');
      updateValue('userName', '');
      return {
        ...state,
        isUserLoggedIn: false,
        userToken: '',
        userName: '',
      };
    }
    case USER_SIGN_UP: {
      const token = payload.authToken || ''; // Ensure payload.authToken is a string
      updateValue('userToken', token);
      return {
        ...state,
        isUserLoggedIn: true,
        isLoading: false,
        error: false,
        userToken: token,
      };
    }
    case USER_NAME: {
      const name = typeof payload === 'string' ? payload : ''; // Ensure payload is a string
      updateValue('userName', name);
      return {
        ...state,
        isUserLoggedIn: true,
        isLoading: false,
        error: false,
        userName: name,
      };
    }
    default: {
      return state;
    }
  }
};
