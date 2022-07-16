import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers/root';
import { socketMiddleware } from './middleware/socketMiddleware';
import wsUrl from '../assets/scripts/wsUrl';
import {
  ALL_ORDERS_WS_CONNECTION_START,
  ALL_ORDERS_WS_CONNECTION_SUCCESS,
  ALL_ORDERS_WS_CONNECTION_ERROR,
  ALL_ORDERS_WS_CONNECTION_CLOSED,
  ALL_ORDERS_WS_GET_MESSAGE,
  ALL_ORDERS_WS_CLOSE_CONNECTION
} from './actions/all-orders-web-socket';
import {
  USER_ORDERS_WS_CONNECTION_START,
  USER_ORDERS_WS_CONNECTION_SUCCESS,
  USER_ORDERS_WS_CONNECTION_ERROR,
  USER_ORDERS_WS_CONNECTION_CLOSED,
  USER_ORDERS_WS_GET_MESSAGE,
  USER_ORDERS_WS_CLOSE_CONNECTION
} from './actions/user-orders-web-socket';

export interface IWsActions {
  wsInit: typeof ALL_ORDERS_WS_CONNECTION_START | typeof USER_ORDERS_WS_CONNECTION_START; 
  onOpen: typeof ALL_ORDERS_WS_CONNECTION_SUCCESS | typeof USER_ORDERS_WS_CONNECTION_SUCCESS;
  onClose: typeof ALL_ORDERS_WS_CONNECTION_CLOSED | typeof USER_ORDERS_WS_CONNECTION_CLOSED;
  onError: typeof ALL_ORDERS_WS_CONNECTION_ERROR | typeof USER_ORDERS_WS_CONNECTION_ERROR;
  onMessage: typeof ALL_ORDERS_WS_GET_MESSAGE | typeof USER_ORDERS_WS_GET_MESSAGE;
  wsClose: typeof ALL_ORDERS_WS_CLOSE_CONNECTION | typeof USER_ORDERS_WS_CLOSE_CONNECTION;
}

const allOrdersWsAction: IWsActions = { 
  wsInit: ALL_ORDERS_WS_CONNECTION_START, 
  onOpen: ALL_ORDERS_WS_CONNECTION_SUCCESS, 
  onClose: ALL_ORDERS_WS_CONNECTION_CLOSED, 
  onError: ALL_ORDERS_WS_CONNECTION_ERROR, 
  onMessage: ALL_ORDERS_WS_GET_MESSAGE,
  wsClose: ALL_ORDERS_WS_CLOSE_CONNECTION
}

const userOrdersWsAction: IWsActions = { 
  wsInit: USER_ORDERS_WS_CONNECTION_START, 
  onOpen: USER_ORDERS_WS_CONNECTION_SUCCESS, 
  onClose: USER_ORDERS_WS_CONNECTION_CLOSED, 
  onError: USER_ORDERS_WS_CONNECTION_ERROR, 
  onMessage: USER_ORDERS_WS_GET_MESSAGE,
  wsClose: USER_ORDERS_WS_CLOSE_CONNECTION
}

export const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(
    thunk, 
    socketMiddleware(`${wsUrl}/all`, allOrdersWsAction, false), 
    socketMiddleware(`${wsUrl}`, userOrdersWsAction, true)),
));

