import TUser from '../../types/user';
import { USER_REQUEST, USER_SUCCESS, USER_FAILED, RESET_USER_STORAGE, RESET_USER_REQUEST_STATUS, TOKEN_AUTHORIZATION, TUserActions } from '../actions/user';

interface IUserState {
  user: TUser;

  isAuthorized: boolean;
  request: boolean;
  requestSuccess: boolean;
  requestFailed: boolean;
  errorStatus: number | null;
  errorMessage: string;
  tokenAuthorization: boolean;
}

const initialState: IUserState = {
  user: {
    email: '',
    name: ''
  },

  isAuthorized: false,
  request: false,
  requestSuccess: false,
  requestFailed: false,
  errorStatus: null,
  errorMessage: '',
  tokenAuthorization: false,
}

export const userReducer = (state = initialState, action: TUserActions): IUserState => {
  switch (action.type) {
    case USER_REQUEST: {
      return {
        ...state,
        request: true,
        requestSuccess: false,
        requestFailed: false,
        errorStatus: null,
        errorMessage: '',
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
        errorStatus: null,
        errorMessage: '',
      }
    }
    case USER_FAILED: {
      return {
        ...state,
        requestSuccess: false,
        request: false,
        requestFailed: true,
        errorStatus: action.status || null,
        errorMessage: action.errorMessage || '',
        tokenAuthorization: false,
      };
    }
    case RESET_USER_REQUEST_STATUS: {
      return {
        ...state,
        requestSuccess: false,
        request: false,
        requestFailed: false,
        errorStatus: null,
        errorMessage: '',
        tokenAuthorization: false,
      }
    }
    case TOKEN_AUTHORIZATION: {
      return {
        ...state,
        tokenAuthorization: true,
        requestSuccess: false,
        requestFailed: false,
        errorStatus: null,
        errorMessage: '',
      } 
    }
    case RESET_USER_STORAGE: {
      return {
        ...initialState
      }
    }
    default: {
      return state;
    }
  }
}
