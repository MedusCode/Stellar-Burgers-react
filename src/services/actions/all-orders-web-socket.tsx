import IOrdersData from "../../types/ordersData";

const ALL_ORDERS_WS_CONNECTION_START: 'ALL_ORDERS_WS_CONNECTION_START' = 'ALL_ORDERS_WS_CONNECTION_START';
const ALL_ORDERS_WS_CONNECTION_SUCCESS: 'ALL_ORDERS_WS_CONNECTION_SUCCESS' = 'ALL_ORDERS_WS_CONNECTION_SUCCESS';
const ALL_ORDERS_WS_CONNECTION_ERROR: 'ALL_ORDERS_WS_CONNECTION_ERROR' = 'ALL_ORDERS_WS_CONNECTION_ERROR';
const ALL_ORDERS_WS_CONNECTION_CLOSED: 'ALL_ORDERS_WS_CONNECTION_CLOSED' = 'ALL_ORDERS_WS_CONNECTION_CLOSED';
const ALL_ORDERS_WS_GET_MESSAGE: 'ALL_ORDERS_WS_GET_MESSAGE' = 'ALL_ORDERS_WS_GET_MESSAGE';
const ALL_ORDERS_WS_CLOSE_CONNECTION: 'ALL_ORDERS_WS_CLOSE_CONNECTION' = 'ALL_ORDERS_WS_CLOSE_CONNECTION';

interface IAllOrdersWsConnectionStartAction {
  type: typeof ALL_ORDERS_WS_CONNECTION_START;
}

interface IAllOrdersWsConnectionSuccessAction {
  type: typeof ALL_ORDERS_WS_CONNECTION_SUCCESS;
}

interface IAllOrdersWsConnectionErrorAction {
  type: typeof ALL_ORDERS_WS_CONNECTION_ERROR;
  payload: Object
}

interface IAllOrdersWsConnectionClosedAction {
  type: typeof ALL_ORDERS_WS_CONNECTION_CLOSED;
}

interface IAllOrdersWsGetMessageAction {
  type: typeof ALL_ORDERS_WS_GET_MESSAGE;
  payload: IOrdersData;
}

interface IAllOrdersWsCloseConnectionAction {
  type: typeof ALL_ORDERS_WS_CLOSE_CONNECTION;
}

export type TAllOrdersWsActions = 
  IAllOrdersWsConnectionErrorAction 
  | IAllOrdersWsConnectionClosedAction 
  | IAllOrdersWsConnectionStartAction 
  | IAllOrdersWsGetMessageAction 
  | IAllOrdersWsCloseConnectionAction
  | IAllOrdersWsConnectionSuccessAction

export {
  ALL_ORDERS_WS_CONNECTION_START,
  ALL_ORDERS_WS_CONNECTION_SUCCESS,
  ALL_ORDERS_WS_CONNECTION_ERROR,
  ALL_ORDERS_WS_CONNECTION_CLOSED,
  ALL_ORDERS_WS_GET_MESSAGE,
  ALL_ORDERS_WS_CLOSE_CONNECTION
}