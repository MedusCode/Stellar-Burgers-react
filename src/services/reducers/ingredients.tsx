import IIngredient from '../../types/ingredient';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  INCREASE_INGREDIENTS_COUNTER,
  DECREASE_INGREDIENTS_COUNTER,
  CLEAR_COUNTERS, 
  TIngredientsActions} from '../actions/ingredients';

interface IIngredientsState {
  bun: Array<IIngredient>;
  sauce: Array<IIngredient>;
  main: Array<IIngredient>;

  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  errorCode: number | null;
}

const initialState: IIngredientsState = {
  bun: [],
  sauce: [],
  main: [],

  ingredientsRequest: false,
  ingredientsFailed: false,
  errorCode: null
};

export const ingredientsReducer = (state = initialState, action: TIngredientsActions): IIngredientsState => {
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
        errorCode: action.status || null
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
      const type = action.ingredient.type;
      return {
        ...state,
        [type]: [...state[type].map(ingredient => {
          if (ingredient._id === action.ingredient._id) return {...ingredient, __v: ingredient.__v - 1}
          return ingredient
        })]
      }
    }
    case CLEAR_COUNTERS: {
      return {
        ...state,
        bun: [...state.bun.map(ingredient => ({...ingredient, __v: 0}))],
        sauce: [...state.sauce.map(ingredient => ({...ingredient, __v: 0}))],
        main: [...state.main.map(ingredient => ({...ingredient, __v: 0}))]
      }
    }
    default: {
      return state;
    }
  }
}
