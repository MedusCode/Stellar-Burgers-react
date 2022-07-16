import IOrdersData from "../../types/ordersData";

const USER_ORDERS_WS_CONNECTION_START: 'USER_ORDERS_WS_CONNECTION_START' = 'USER_ORDERS_WS_CONNECTION_START';
const USER_ORDERS_WS_CONNECTION_SUCCESS: 'USER_ORDERS_WS_CONNECTION_SUCCESS' = 'USER_ORDERS_WS_CONNECTION_SUCCESS';
const USER_ORDERS_WS_CONNECTION_ERROR: 'USER_ORDERS_WS_CONNECTION_ERROR' = 'USER_ORDERS_WS_CONNECTION_ERROR';
const USER_ORDERS_WS_CONNECTION_CLOSED: 'USER_ORDERS_WS_CONNECTION_CLOSED' = 'USER_ORDERS_WS_CONNECTION_CLOSED';
const USER_ORDERS_WS_GET_MESSAGE: 'USER_ORDERS_WS_GET_MESSAGE' = 'USER_ORDERS_WS_GET_MESSAGE';
const USER_ORDERS_WS_CLOSE_CONNECTION: 'USER_ORDERS_WS_CLOSE_CONNECTION' = 'USER_ORDERS_WS_CLOSE_CONNECTION';

interface IUserOrdersWsConnectionStartAction {
  type: typeof USER_ORDERS_WS_CONNECTION_START;
}

interface IUserOrdersWsConnectionSuccessAction {
  type: typeof USER_ORDERS_WS_CONNECTION_SUCCESS;
}

interface IUserOrdersWsConnectionErrorAction {
  type: typeof USER_ORDERS_WS_CONNECTION_ERROR;
  payload: Object
}

interface IUserOrdersWsConnectionClosedAction {
  type: typeof USER_ORDERS_WS_CONNECTION_CLOSED;
}

interface IUserOrdersWsGetMessageAction {
  type: typeof USER_ORDERS_WS_GET_MESSAGE;
  payload: IOrdersData;
}

interface IUserOrdersWsCloseConnectionAction {
  type: typeof USER_ORDERS_WS_CLOSE_CONNECTION;
}

export type TUserOrdersWsActions = 
  IUserOrdersWsConnectionErrorAction 
  | IUserOrdersWsConnectionClosedAction 
  | IUserOrdersWsConnectionStartAction 
  | IUserOrdersWsGetMessageAction 
  | IUserOrdersWsCloseConnectionAction
  | IUserOrdersWsConnectionSuccessAction

export {
  USER_ORDERS_WS_CONNECTION_START,
  USER_ORDERS_WS_CONNECTION_SUCCESS,
  USER_ORDERS_WS_CONNECTION_ERROR,
  USER_ORDERS_WS_CONNECTION_CLOSED,
  USER_ORDERS_WS_GET_MESSAGE,
  USER_ORDERS_WS_CLOSE_CONNECTION
}