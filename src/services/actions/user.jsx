import checkResponse from "../../assets/scripts/checkResponse";
import baseUrl from "../../assets/scripts/baseUrl";
import checkIfEmailInvalid from "../../assets/scripts/checkIfEmailInvalid";
import { setCookie, getCookie, deleteCookie } from "../../assets/scripts/cookie";

const USER_REQUEST = 'USER_REQUEST';
const USER_SUCCESS = 'USER_SUCCESS';
const USER_FAILED = 'USER_FAILED';
const RESET_STORAGE = 'RESET_STORAGE';
const RESET_REQUEST_STATUS = 'RESET_REQUEST_STATUS';

const requestToServer = (method = 'POST', endpoint, body) => {
  return fetch(`${baseUrl}/auth/${endpoint}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      authorization: method === 'GET' || method === 'PATCH' ? 'Bearer ' + getCookie('accessToken') : undefined
    },
    body: body ? JSON.stringify(body) : undefined
  })
    .then(checkResponse)
}

const refreshTokenRequest = () => {
    return requestToServer('POST', 'token', {token: getCookie('refreshToken')})
      .then(data => {
        setCookie('refreshToken', data.refreshToken);
        setCookie('accessToken', data.accessToken.split('Bearer ')[1]);
      })
      .catch(() => {
        return 'Token was not refreshed';
      })
}

const loginRequest = (body) => {
  return (dispatch) => {
    if (checkIfEmailInvalid(body.email) || body.password.length < 5) {
      dispatch({type: USER_FAILED, status: 401});
      return;
    }
    dispatch({type: USER_REQUEST});
    requestToServer('POST', 'login', body)
      .then(data => {
        dispatch({ type: USER_SUCCESS, user: data.user });
        setCookie('refreshToken', data.refreshToken);
        setCookie('accessToken', data.accessToken.split('Bearer ')[1]);
      })
      .catch(error => {
        dispatch({type: USER_FAILED, status: error})
      }); 
  }
}

const registerRequest = (body) => {
  return (dispatch) => {
    dispatch({type: USER_REQUEST});
    requestToServer('POST', 'register', body)
      .then(data => {
        dispatch({ type: USER_SUCCESS, user: data.user });
        setCookie('refreshToken', data.refreshToken);
        setCookie('accessToken', data.accessToken.split('Bearer ')[1]);
      })
      .catch(error => {
        dispatch({type: USER_FAILED, status: error})
      });
  }
}

const logoutRequest = () => {
  return (dispatch) => {
    dispatch({type: USER_REQUEST});
    requestToServer('POST', 'logout', {token: getCookie('refreshToken')})
      .then(() => {
        dispatch({type: RESET_STORAGE});
        deleteCookie('refreshToken');
        deleteCookie('accessToken');
      })
      .catch(error => {
        dispatch({type: USER_FAILED, status: error})
      });
  }
}

const getUserRequest = () => {
  return (dispatch) => {
    const request = () => {
      return requestToServer('GET', 'user')
        .then(data => {
          dispatch({ type: USER_SUCCESS, user: data.user });
          dispatch({ type: RESET_REQUEST_STATUS });
        })
    }

    request()
      .catch(() => {
        getCookie('refreshToken') && refreshTokenRequest()
          .then(() => {
            request().catch(() => {
              dispatch({type: RESET_STORAGE});
              deleteCookie('refreshToken');
              deleteCookie('accessToken');
            })
          })
          .catch(() => {
            dispatch({type: RESET_STORAGE});
            deleteCookie('refreshToken');
            deleteCookie('accessToken');
          })
      })
  }
}

const updateUserRequest = (body) => {
  return (dispatch) => {
    const request = () => {
      return requestToServer('PATCH', 'user', body)
        .then(data => {
          dispatch({ type: USER_SUCCESS, user: data.user });
        })
    }

    dispatch({type: USER_REQUEST});
    request()
      .catch(() => {
        getCookie('refreshToken') && refreshTokenRequest()
          .then(() => {
            request().catch(error => {dispatch({ type: USER_FAILED, status: error })});
          })
          .catch(() => {
            dispatch({type: RESET_STORAGE});
            deleteCookie('refreshToken');
            deleteCookie('accessToken');
          })
      })
  }
}


export { USER_REQUEST,
  USER_SUCCESS,
  USER_FAILED,
  RESET_STORAGE,
  RESET_REQUEST_STATUS,
  loginRequest,
  registerRequest,
  logoutRequest,
  getUserRequest,
  updateUserRequest
};