import {
  USER_ORDERS_WS_CONNECTION_SUCCESS,
  USER_ORDERS_WS_CONNECTION_ERROR,
  USER_ORDERS_WS_CONNECTION_CLOSED,
  USER_ORDERS_WS_GET_MESSAGE,
  USER_ORDERS_WS_CLOSE_CONNECTION
} from '../actions/user-orders-web-socket';

const initialState = {
  wsConnected: false,
  messages: [],
  error: undefined
}; 

export const userOrdersWebSocketReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ORDERS_WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true
      };
    case USER_ORDERS_WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      };
    case USER_ORDERS_WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false
      };
    case USER_ORDERS_WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        messages: [...state.messages, action.payload]
      };
    case USER_ORDERS_WS_CLOSE_CONNECTION: 
      return {
        ...initialState
      }
    default: {
      return state;
    }
  }
}