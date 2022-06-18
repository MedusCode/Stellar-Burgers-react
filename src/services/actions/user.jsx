import checkResponse from "../../assets/scripts/checkResponse";
import baseUrl from "../../assets/scripts/baseUrl";
import checkIfEmailInvalid from "../../assets/scripts/checkIfEmailInvalid";

const USER_REQUEST = 'USER_REQUEST';
const USER_SUCCESS = 'USER_SUCCESS';
const USER_FAILED = 'USER_FAILED';
const RESET_USER_STORAGE = 'RESET_USER_STORAGE';
const RESET_USER_REQUEST_STATUS = 'RESET_USER_REQUEST_STATUS';
const TOKEN_AUTHORIZATION = 'TOKEN_AUTHORIZATION';

const requestToServer = (method = 'POST', endpoint, body) => {
  return fetch(`${baseUrl}/auth/${endpoint}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      authorization: method === 'GET' || method === 'PATCH' ? 'Bearer ' + localStorage.getItem('accessToken') : undefined
    },
    body: body ? JSON.stringify(body) : undefined
  })
    .then(checkResponse)
}

const refreshTokenRequest = () => {
    return requestToServer('POST', 'token', {token: localStorage.getItem('refreshToken')})
      .then(data => {
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('accessToken', data.accessToken.split('Bearer ')[1]);
      })
      .catch(() => {
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
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
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('accessToken', data.accessToken.split('Bearer ')[1]);
        dispatch({ type: USER_SUCCESS, user: data.user });
      })
      .catch(error => {
        dispatch({type: USER_FAILED, status: error.status, errorMessage: error.body.message});
      })
  }
}

const registerRequest = (body) => {
  return (dispatch) => {
    dispatch({type: USER_REQUEST});
    requestToServer('POST', 'register', body)
      .then(data => {
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('accessToken', data.accessToken.split('Bearer ')[1]);
        dispatch({ type: USER_SUCCESS, user: data.user });
      })
      .catch(error => {
        dispatch({type: USER_FAILED, status: error.status, errorMessage: error.body.message});
      });
  }
}

const logoutRequest = () => {
  return (dispatch) => {
    dispatch({type: USER_REQUEST});
    requestToServer('POST', 'logout', {token: localStorage.getItem('refreshToken')})
      .then(() => {
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        dispatch({ type: RESET_USER_STORAGE });
      })
      .catch(error => {
        dispatch({ type: USER_FAILED, status: error.status, errorMessage: error.body.message});
      });
  }
}

const getUserRequest = () => {
  return (dispatch) => {
    const request = () => {
      return requestToServer('GET', 'user')
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
      .catch(error => {
        if (error.status === 403 && error.body.message === 'jwt expired') {
          refreshTokenRequest()
            .then(() => {
              request().catch(() => {dispatch({type: RESET_USER_STORAGE})})
            })
        }
        else dispatch({type: USER_FAILED, status: error.status, errorMessage: error.body.message});
      })
  }
}


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
