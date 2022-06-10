import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { modalReducer } from './modal';
import { burgerConstructorReducer } from './burger-constructor';
import { orderReducer } from './order';
import { draggingReducer } from './dragging';
import { userReducer } from './user';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  modal: modalReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  dragging: draggingReducer,
  user: userReducer
});
