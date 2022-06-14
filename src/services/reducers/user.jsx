import { USER_REQUEST, USER_SUCCESS, USER_FAILED, RESET_USER_STORAGE, RESET_USER_REQUEST_STATUS, TOKEN_AUTHORIZATION } from '../actions/user';

const initialState = {
  user: {
    email: '',
    name: ''
  },

  isAuthorized: false,
  request: false,
  requestSuccess: false,
  requestFailed: false,
  errorStatus: '',
  tokenAuthorization: false,
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REQUEST: {
      return {
        ...state,
        request: true,
        requestSuccess: false,
        requestFailed: false,
        errorStatus: ''
      };
    }
    case USER_SUCCESS: {
      return {
        ...state,
        user: {
          email: action.user.email,
          name: action.user.name
        },

        isAuthorized: true,
        requestSuccess: true,
        request: false,
        requestFailed: false,
        tokenAuthorization: false,
      }
    }
    case USER_FAILED: {
      return {
        ...state,
        requestSuccess: false,
        request: false,
        requestFailed: true,
        errorStatus: action.status,
        tokenAuthorization: false,
      };
    }
    case RESET_USER_STORAGE: {
      return initialState
    }
    case RESET_USER_REQUEST_STATUS: {
      return {
        ...state,
        requestSuccess: false,
        request: false,
        requestFailed: false,
        errorStatus: '',
        tokenAuthorization: false,
      }
    }
    case TOKEN_AUTHORIZATION: {
      return {
        ...state,
        tokenAuthorization: true,
        requestSuccess: false,
        requestFailed: false,
        errorStatus: ''
      } 
    }
    default: {
      return state;
    }
  }
}
