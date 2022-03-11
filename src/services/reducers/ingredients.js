import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  INCREASE_INGREDIENTS_COUNTER,
  DECREASE_INGREDIENTS_COUNTER } from '../actions/ingredients';

const initialState = {
  bun: [],
  sauce: [],
  main: [],

  ingredientsRequest: false,
  ingredientsFailed: false,
  errorCode: ''
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: false,
        bun: action.bun,
        sauce: action.sauce,
        main: action.main
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true,
        errorCode: action.status
      };
    }
    case INCREASE_INGREDIENTS_COUNTER: {
      const key = action.ingredient.type;
      if (key === 'bun') return {
        ...state, bun: state.bun.map(ingredient => {
          if (ingredient._id === action.ingredient._id) return {...ingredient, __v: 2}
          return {...ingredient, __v: 0}
        })
      }
      return {
        ...state,
        [key]: [...state[key].map(ingredient => {
          if (ingredient._id === action.ingredient._id) return {...ingredient, __v: ingredient.__v + 1}
          return ingredient
        })]
      }
    }
    case DECREASE_INGREDIENTS_COUNTER: {
      const key = action.ingredient.type;
      return {
        ...state,
        [key]: [...state[key].map(ingredient => {
          if (ingredient._id === action.ingredient._id) return {...ingredient, __v: ingredient.__v - 1}
          return ingredient
        })]
      }
    }
    default: {
      return {...state}
    }
  }
}
