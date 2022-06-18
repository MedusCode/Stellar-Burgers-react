import {
  ALL_ORDERS_WS_CONNECTION_SUCCESS,
  ALL_ORDERS_WS_CONNECTION_ERROR,
  ALL_ORDERS_WS_CONNECTION_CLOSED,
  ALL_ORDERS_WS_GET_MESSAGE,
  ALL_ORDERS_WS_CLOSE_CONNECTION
} from '../actions/all-orders-web-socket';

const initialState = {
  wsConnected: false,
  messages: [],
  error: undefined
}; 

export const allOrdersWebSocketReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_ORDERS_WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true
      };
    case ALL_ORDERS_WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      };
    case ALL_ORDERS_WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false
      };
    case ALL_ORDERS_WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        messages: [...state.messages, action.payload]
      };
    case ALL_ORDERS_WS_CLOSE_CONNECTION:
      return {
        ...initialState,
      }
    default: {
      return state;
    }
  }
}