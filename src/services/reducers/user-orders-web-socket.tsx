import IOrdersData from '../../types/ordersData';
import {
  USER_ORDERS_WS_CONNECTION_SUCCESS,
  USER_ORDERS_WS_CONNECTION_ERROR,
  USER_ORDERS_WS_CONNECTION_CLOSED,
  USER_ORDERS_WS_GET_MESSAGE,
  USER_ORDERS_WS_CLOSE_CONNECTION,
  TUserOrdersWsActions
} from '../actions/user-orders-web-socket';

interface IUserOrderWsState {
  wsConnected: boolean;
  messages: Array<IOrdersData>;
  error: Object | null;
}

const initialState: IUserOrderWsState = {
  wsConnected: false,
  messages: [],
  error: null
}; 

export const userOrdersWebSocketReducer = (state = initialState, action: TUserOrdersWsActions): IUserOrderWsState => {
  switch (action.type) {
    case USER_ORDERS_WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: null,
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
        error: null,
        wsConnected: false
      };
    case USER_ORDERS_WS_GET_MESSAGE:
      return {
        ...state,
        error: null,
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