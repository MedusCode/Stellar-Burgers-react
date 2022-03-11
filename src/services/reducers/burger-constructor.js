import { nanoid } from 'nanoid';
import { ADD_INGREDIENT_TO_CONSTRUCTOR, REMOVE_INGREDIENT_FROM_CONSTRUCTOR, CLEAR_CONSTRUCTOR } from '../actions/burger-constructor';

const initialState = {
  bun: {
    price: 0
  },
  ingredients: [],
  price: 0
}

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT_TO_CONSTRUCTOR: {
      const newState = action.ingredient.type === 'bun'
        ? {...state, bun: {...action.ingredient, nanoid: nanoid()}}
        : {...state, ingredients: [...state.ingredients, {...action.ingredient, nanoid: nanoid()}]}
      const newPrice = newState.ingredients.reduce((price, ingredient) => price + ingredient.price, 0) + newState.bun.price * 2;
      return {...newState, price: newPrice}
    }
    case REMOVE_INGREDIENT_FROM_CONSTRUCTOR: {
      return {
        ...state,
        ingredients: state.ingredients.filter(ingredient => ingredient.nanoid !== action.ingredient.nanoid),
        price: state.price - action.ingredient.price
      }
    }
    case CLEAR_CONSTRUCTOR: {
      return {
        ...initialState
      }
    }
    default: {
      return {...state}
    }
  }
}
