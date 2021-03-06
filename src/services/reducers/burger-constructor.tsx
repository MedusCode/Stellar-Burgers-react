import IIngredient, { TBun } from '../../types/ingredient';
import {
  ADD_BUN_TO_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  CLEAR_CONSTRUCTOR,
  CHANGE_CONSTRUCTOR_INGREDIENTS,
  TBurgerConstructorActions
} from '../actions/burger-constructor';

interface IBurgerConstructorState {
  bun: TBun;
  ingredients: Array<IIngredient>;
  price: number;
}

const initialState: IBurgerConstructorState = {
  bun: {
    price: 0
  } as TBun,
  ingredients: [],
  price: 0
}

export const burgerConstructorReducer = (state = initialState, action: TBurgerConstructorActions): IBurgerConstructorState => {
  switch (action.type) {
    case ADD_BUN_TO_CONSTRUCTOR: {
      const price = state.ingredients.reduce((price, ingredient) => price + ingredient.price, 0) + action.bun.price * 2;
      return {...state, bun: action.bun, price: price}
    }
    case REMOVE_INGREDIENT_FROM_CONSTRUCTOR: {
      return {
        ...state,
        ingredients: state.ingredients.filter(ingredient => ingredient.nanoid !== action.ingredient.nanoid),
        price: state.price - action.ingredient.price
      }
    }
    case CHANGE_CONSTRUCTOR_INGREDIENTS: {
      const price = action.ingredients.reduce((price, ingredient) => price + ingredient.price, 0) + state.bun.price * 2;
      return {
        ...state,
        ingredients: action.ingredients,
        price: price
      }
    }
    case CLEAR_CONSTRUCTOR: {
      return {
        ...initialState
      }
    }
    default: {
      return state;
    }
  }
}
