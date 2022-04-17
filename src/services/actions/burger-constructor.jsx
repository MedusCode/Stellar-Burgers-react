import { INCREASE_INGREDIENTS_COUNTER, DECREASE_INGREDIENTS_COUNTER, CLEAR_COUNTERS } from './ingredients'

const ADD_INGREDIENT_TO_CONSTRUCTOR = 'ADD_INGREDIENT_TO_CONSTRUCTOR';
const REMOVE_INGREDIENT_FROM_CONSTRUCTOR = 'REMOVE_INGREDIENT_FROM_CONSTRUCTOR';
const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';
const CHANGE_CONSTRUCTOR_ORDER = 'CHANGE_CONSTRUCTOR_ORDER';

const addToConstructor = (ingredient, index) => {
  return (dispatch) => {
    dispatch({type: ADD_INGREDIENT_TO_CONSTRUCTOR, ingredient: ingredient, index: index});
    dispatch({type: INCREASE_INGREDIENTS_COUNTER, ingredient: ingredient});
  }
}

const changeConstructorIngredients = (isNewIngredient) => {
  return (dispatch, getState) => {
    if (isNewIngredient) {
      const ingredient = getState().dragging.ingredient;
      dispatch({type: INCREASE_INGREDIENTS_COUNTER, ingredient: ingredient});
    }
    const ingredients = getState().dragging.ingredients;
    dispatch({type: CHANGE_CONSTRUCTOR_ORDER, ingredients: ingredients});
  }
}

const removeFromConstructor = (ingredient) => {
  return (dispatch) => {
    dispatch({type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR, ingredient: ingredient});
    dispatch({type: DECREASE_INGREDIENTS_COUNTER, ingredient: ingredient});
  }
}

const clearConstructor = () => {
  return (dispatch) => {
    dispatch({type: CLEAR_CONSTRUCTOR});
    dispatch({type: CLEAR_COUNTERS});
  }
}

export { ADD_INGREDIENT_TO_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  CLEAR_CONSTRUCTOR,
  CHANGE_CONSTRUCTOR_ORDER,
  addToConstructor,
  removeFromConstructor,
  clearConstructor,
  changeConstructorIngredients
}