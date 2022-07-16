import IOrdersData from '../../types/ordersData';
import {
  ALL_ORDERS_WS_CONNECTION_SUCCESS,
  ALL_ORDERS_WS_CONNECTION_ERROR,
  ALL_ORDERS_WS_CONNECTION_CLOSED,
  ALL_ORDERS_WS_GET_MESSAGE,
  ALL_ORDERS_WS_CLOSE_CONNECTION,
  TAllOrdersWsActions
} from '../actions/all-orders-web-socket';

interface IAllOrderWsState {
  wsConnected: boolean;
  messages: Array<IOrdersData>;
  error: Object | null;
}

const initialState: IAllOrderWsState = {
  wsConnected: false,
  messages: [],
  error: null
}; 

export const allOrdersWebSocketReducer = (state = initialState, action: TAllOrdersWsActions ): IAllOrderWsState => {
  switch (action.type) {
    case ALL_ORDERS_WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: null,
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
        error: null,
        wsConnected: false
      };
    case ALL_ORDERS_WS_GET_MESSAGE:
      return {
        ...state,
        error: null,
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