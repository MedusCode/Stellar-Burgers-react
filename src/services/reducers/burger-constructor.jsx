import {
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  CLEAR_CONSTRUCTOR,
  NEW_CONSTRUCTOR_ORDER} from '../actions/burger-constructor';

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
      let newState = {};
      if (action.ingredient.type === 'bun') newState = {...state, bun: {...action.ingredient}}
      else {
        const newArray = [...state.ingredients];
        newArray.splice(action.index, 0, action.ingredient)
        newState = {...state, ingredients: newArray}
      }
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
    case NEW_CONSTRUCTOR_ORDER: {
      return {
        ...state,
        ingredients: [...action.ingredients]
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
