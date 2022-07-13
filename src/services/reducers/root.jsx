import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { modalReducer } from './modal';
import { burgerConstructorReducer } from './burger-constructor';
import { orderReducer } from './order';
import { draggingReducer } from './dragging';
import { userReducer } from './user';
import { allOrdersWebSocketReducer } from './all-orders-web-socket';
import { userOrdersWebSocketReducer } from './user-orders-web-socket';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  modal: modalReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  dragging: draggingReducer,
  user: userReducer,
  allOrdersWebSocket: allOrdersWebSocketReducer,
  userOrdersWebSocket: userOrdersWebSocketReducer
});
