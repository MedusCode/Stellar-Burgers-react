import { compose, createStore, applyMiddleware } from 'redux';
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
  ALL_ORDERS_WS_SEND_MESSAGE,
  ALL_ORDERS_WS_CLOSE_CONNECTION
} from './actions/all-orders-web-socket.jsx';
import {
  USER_ORDERS_WS_CONNECTION_START,
  USER_ORDERS_WS_CONNECTION_SUCCESS,
  USER_ORDERS_WS_CONNECTION_ERROR,
  USER_ORDERS_WS_CONNECTION_CLOSED,
  USER_ORDERS_WS_GET_MESSAGE,
  USER_ORDERS_WS_SEND_MESSAGE,
  USER_ORDERS_WS_CLOSE_CONNECTION
} from './actions/user-orders-web-socket';

const allOrdersWsAction = { 
  wsInit: ALL_ORDERS_WS_CONNECTION_START, 
  wsSendMessage: ALL_ORDERS_WS_SEND_MESSAGE, 
  onOpen: ALL_ORDERS_WS_CONNECTION_SUCCESS, 
  onClose: ALL_ORDERS_WS_CONNECTION_CLOSED, 
  onError: ALL_ORDERS_WS_CONNECTION_ERROR, 
  onMessage: ALL_ORDERS_WS_GET_MESSAGE,
  wsClose: ALL_ORDERS_WS_CLOSE_CONNECTION
}

const userOrdersWsAction = { 
  wsInit: USER_ORDERS_WS_CONNECTION_START, 
  wsSendMessage: USER_ORDERS_WS_SEND_MESSAGE, 
  onOpen: USER_ORDERS_WS_CONNECTION_SUCCESS, 
  onClose: USER_ORDERS_WS_CONNECTION_CLOSED, 
  onError: USER_ORDERS_WS_CONNECTION_ERROR, 
  onMessage: USER_ORDERS_WS_GET_MESSAGE,
  wsClose: USER_ORDERS_WS_CLOSE_CONNECTION
}

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const enhancer = composeEnhancers(applyMiddleware(
  thunk, 
  socketMiddleware(`${wsUrl}/all`, allOrdersWsAction, false), 
  socketMiddleware(`${wsUrl}`, userOrdersWsAction, true)
));

export const store = createStore(rootReducer, enhancer);
