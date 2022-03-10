import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED, getIngredients } from '../actions/ingredients';

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
    default: {
      return {...state}
    }
  }
}
