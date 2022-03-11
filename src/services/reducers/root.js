import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { modalReducer } from './modal';
import { burgerConstructorReducer } from './burger-constructor';
import { appReducer } from './app';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  modal: modalReducer,
  burgerConstructor: burgerConstructorReducer,
  app: appReducer
})
