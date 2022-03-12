import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { modalReducer } from './modal';
import { burgerConstructorReducer } from './burger-constructor';
import { appReducer } from './app';
import { orderReducer } from './order';
import { draggingReducer } from './dragging';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  modal: modalReducer,
  burgerConstructor: burgerConstructorReducer,
  app: appReducer,
  order: orderReducer,
  dragging: draggingReducer
})
