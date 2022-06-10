import checkResponse from "../../assets/scripts/checkResponse";
import baseUrl from "../../assets/scripts/baseUrl";
import checkIfEmailInvalid from "../../assets/scripts/checkIfEmailInvalid";
import { setCookie, getCookie, deleteCookie } from "../../assets/scripts/cookie";

const GET_USER_REQUEST = 'GET_USER_REQUEST';
const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
const GET_USER_FAILED = 'GET_USER_FAILED';
const RESET_STORAGE = 'RESET_STORAGE';

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
        return 'error';
      })
}

const loginRequest = (body) => {
  return (dispatch) => {
    if (checkIfEmailInvalid(body.email) || body.password.length < 5) {
      dispatch({type: GET_USER_FAILED, status: 401});
      return;
    }
    dispatch({type: GET_USER_REQUEST});
    requestToServer('POST', 'login', body)
      .then(data => {
        dispatch({ type: GET_USER_SUCCESS, user: data.user });
        setCookie('refreshToken', data.refreshToken);
        setCookie('accessToken', data.accessToken.split('Bearer ')[1]);
      })
      .catch(error => {
        dispatch({type: GET_USER_FAILED, status: error})
      }); 
  }
}

const registerRequest = (body) => {
  return (dispatch) => {
    dispatch({type: GET_USER_REQUEST});
    requestToServer('POST', 'register', body)
      .then(data => {
        dispatch({ type: GET_USER_SUCCESS, user: data.user });
        setCookie('refreshToken', data.refreshToken);
        setCookie('accessToken', data.accessToken.split('Bearer ')[1]);
      })
      .catch(error => {
        dispatch({type: GET_USER_FAILED, status: error})
      });
  }
}

const logoutRequest = () => {
  return (dispatch) => {
    dispatch({type: GET_USER_REQUEST});
    requestToServer('POST', 'logout', {token: getCookie('refreshToken')})
      .then(() => {
        dispatch({type: RESET_STORAGE});
        deleteCookie('refreshToken');
        deleteCookie('accessToken');
      })
      .catch(error => {
        dispatch({type: GET_USER_FAILED, status: error})
      });
  }
}

const userRequest = () => {
  return async function(dispatch) {
    const request = () => {
      return requestToServer('GET', 'user')
        .then(data => {
          dispatch({ type: GET_USER_SUCCESS, user: data.user });
        })
    }

    request()
      .catch(() => {
        getCookie('refreshToken') && refreshTokenRequest()
          .then(() => {
            request()
          })
      })
  }
}

export { GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILED, RESET_STORAGE, loginRequest, registerRequest, logoutRequest, userRequest };
