import { INCREASE_INGREDIENTS_COUNTER, DECREASE_INGREDIENTS_COUNTER } from './ingredients'

const ADD_INGREDIENT_TO_CONSTRUCTOR = 'ADD_INGREDIENT_TO_CONSTRUCTOR';
const REMOVE_INGREDIENT_FROM_CONSTRUCTOR = 'REMOVE_INGREDIENT_FROM_CONSTRUCTOR';

const addToConstructor = (ingredient) => {
  return (dispatch) => {
    dispatch({type: ADD_INGREDIENT_TO_CONSTRUCTOR, ingredient: ingredient});
    dispatch({type: INCREASE_INGREDIENTS_COUNTER, ingredient: ingredient});
  }
}

const removeFromConstructor = (ingredient) => {
  return (dispatch) => {
    dispatch({type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR, ingredient: ingredient});
    dispatch({type: DECREASE_INGREDIENTS_COUNTER, ingredient: ingredient});
  }
}

export { ADD_INGREDIENT_TO_CONSTRUCTOR, REMOVE_INGREDIENT_FROM_CONSTRUCTOR, addToConstructor, removeFromConstructor  }