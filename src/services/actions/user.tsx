import checkResponse from "../../assets/scripts/checkResponse";
import baseUrl from "../../assets/scripts/baseUrl";
import checkIfEmailInvalid from "../../assets/scripts/checkIfEmailInvalid";
import TUser from "../../types/user";
import { IGetUserResponseBody, ILoginRequestBody, ILoginResponseBody, IRefreshTokenResponseBody, IRegisterRequestBody, IUpdateUserRequestBody, TRequestBody } from "../../types/requests";
import { AppDispatch, AppThunk } from "../../types/appThunk";

const USER_REQUEST: 'USER_REQUEST' = 'USER_REQUEST';
const USER_SUCCESS: 'USER_SUCCESS' = 'USER_SUCCESS';
const USER_FAILED: 'USER_FAILED' = 'USER_FAILED';
const RESET_USER_STORAGE: 'RESET_USER_STORAGE' = 'RESET_USER_STORAGE';
const RESET_USER_REQUEST_STATUS: 'RESET_USER_REQUEST_STATUS' = 'RESET_USER_REQUEST_STATUS';
const TOKEN_AUTHORIZATION: 'TOKEN_AUTHORIZATION' = 'TOKEN_AUTHORIZATION';

interface IUserRequestAction {
  type: typeof USER_REQUEST;
}

interface IUserSuccessAction {
  type: typeof USER_SUCCESS;
  user: TUser;
}

interface IUserFailedAction {
  type: typeof USER_FAILED;
  status?: number;
  errorMessage?: string;
}

interface IResetUserStorageAction {
  type: typeof RESET_USER_STORAGE;
}

interface IResetUserRequestStatusAction {
  type: typeof RESET_USER_REQUEST_STATUS;
}

interface ITokenAuthorizationAction {
  type: typeof TOKEN_AUTHORIZATION
}

const requestToServer = (method: 'GET' | 'POST' | 'PATCH' = 'POST', endpoint: string, body?: TRequestBody) => {
  return fetch(`${baseUrl}/auth/${endpoint}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      authorization: method === 'GET' || method === 'PATCH' ? 'Bearer ' + localStorage.getItem('accessToken') : ''
    },
    body: body ? JSON.stringify(body) : undefined
  })
}

const refreshTokenRequest = () => {
    return requestToServer('POST', 'token', {token: localStorage.getItem('refreshToken')})
      .then(res => checkResponse<IRefreshTokenResponseBody>(res))
      .then(data => {
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('accessToken', data.accessToken.split('Bearer ')[1]);
      })
      .catch(() => {
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
      })
}

const loginRequest: AppThunk = (body: ILoginRequestBody) => {
  return (dispatch: AppDispatch) => {
    if (checkIfEmailInvalid(body.email) || body.password.length < 5) {
      dispatch({type: USER_FAILED, status: 401});
      return;
    }
    dispatch({type: USER_REQUEST});
    requestToServer('POST', 'login', body)
      .then(res => checkResponse<ILoginResponseBody>(res))
      .then(data => {
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('accessToken', data.accessToken.split('Bearer ')[1]);
        dispatch({ type: USER_SUCCESS, user: data.user });
      })
      .catch(error => {
        dispatch({type: USER_FAILED, status: error.status, errorMessage: error.body?.message});
      })
  }
}

const registerRequest: AppThunk = (body: IRegisterRequestBody) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: USER_REQUEST});
    requestToServer('POST', 'register', body)
      .then(res => checkResponse<ILoginResponseBody>(res))
      .then(data => {
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('accessToken', data.accessToken.split('Bearer ')[1]);
        dispatch({ type: USER_SUCCESS, user: data.user });
      })
      .catch(error => {
        dispatch({type: USER_FAILED, status: error.status, errorMessage: error.body?.message});
      });
  }
}

const logoutRequest: AppThunk = () => {
  return (dispatch: AppDispatch) => {
    dispatch({type: USER_REQUEST});
    requestToServer('POST', 'logout', {token: localStorage.getItem('refreshToken')})
      .then(checkResponse)
      .then(() => {
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        dispatch({ type: RESET_USER_STORAGE });
      })
      .catch(error => {
        dispatch({ type: USER_FAILED, status: error.status, errorMessage: error.body?.message});
      });
  }
}

const getUserRequest: AppThunk = () => {
  return (dispatch: AppDispatch) => {
    const request = () => {
      return requestToServer('GET', 'user')
        .then(res => checkResponse<IGetUserResponseBody>(res))
        .then(data => {
          dispatch({ type: USER_SUCCESS, user: data.user });
          dispatch({ type: RESET_USER_REQUEST_STATUS });
        })
    }

    dispatch({ type: TOKEN_AUTHORIZATION }); 
    request()
      .catch(error => {
        if (error.status === 403 && error.body.message === 'jwt expired') {
          refreshTokenRequest()
            .then(() => {
              request().catch(() => {dispatch({type: RESET_USER_STORAGE})});
            })
        }
        else {
          dispatch({type: RESET_USER_STORAGE});
        }
      })
  }
}

const updateUserRequest: AppThunk= (body: IUpdateUserRequestBody) => {
  return (dispatch: AppDispatch) => {
    const request = () => {
      return requestToServer('PATCH', 'user', body)
        .then(res => checkResponse<IGetUserResponseBody>(res))
        .then(data => {
          dispatch({ type: USER_SUCCESS, user: data.user });
        })
    }

    dispatch({type: USER_REQUEST});
    request()
      .catch(error => {
        if (error.status === 403 && error.body.message === 'jwt expired') {
          refreshTokenRequest()
            .then(() => {
              request().catch(() => {dispatch({type: RESET_USER_STORAGE})})
            })
        }
        else dispatch({type: USER_FAILED, status: error.status, errorMessage: error.body?.message});
      })
  }
}

export type TUserActions = 
  IUserRequestAction 
  | IUserSuccessAction 
  | IUserFailedAction 
  | IResetUserStorageAction 
  | IResetUserRequestStatusAction
  | ITokenAuthorizationAction

export { USER_REQUEST,
  USER_SUCCESS,
  USER_FAILED,
  RESET_USER_STORAGE,
  RESET_USER_REQUEST_STATUS,
  TOKEN_AUTHORIZATION,
  loginRequest,
  registerRequest,
  logoutRequest,
  getUserRequest,
  updateUserRequest,
  refreshTokenRequest
};
