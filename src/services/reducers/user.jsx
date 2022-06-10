import { GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILED, RESET_STORAGE } from '../actions/user';

const initialState = {
  user: {
    email: '',
    name: ''
  },

  isAuthorized: false,
  request: false,
  requestFailed: false,
  errorStatus: ''
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST: {
      return {
        ...state,
        request: true,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        user: {
          email: action.user.email,
          name: action.user.name
        },

        isAuthorized: true,
        request: false,
        requestFailed: false,
      }
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        request: false,
        requestFailed: true,
        errorStatus: action.status
      };
    }
    case RESET_STORAGE: {
      return initialState
    }
    default: {
      return state;
    }
  }
}
