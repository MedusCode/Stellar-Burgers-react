import { INCREASE_INGREDIENTS_COUNTER, DECREASE_INGREDIENTS_COUNTER, CLEAR_COUNTERS } from './ingredients'

const ADD_BUN_TO_CONSTRUCTOR = 'ADD_BUN_TO_CONSTRUCTOR';
const REMOVE_INGREDIENT_FROM_CONSTRUCTOR = 'REMOVE_INGREDIENT_FROM_CONSTRUCTOR';
const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';
const CHANGE_CONSTRUCTOR_INGREDIENTS = 'CHANGE_CONSTRUCTOR_INGREDIENTS';

const addBunToConstructor = (bun) => {
  return (dispatch) => {
    dispatch({type: ADD_BUN_TO_CONSTRUCTOR, bun: bun});
    dispatch({type: INCREASE_INGREDIENTS_COUNTER, ingredient: bun});
  }
}

const changeConstructorIngredients = (isNewIngredient) => {
  return (dispatch, getState) => {
    if (isNewIngredient) {
      const ingredient = getState().dragging.ingredient;
      dispatch({type: INCREASE_INGREDIENTS_COUNTER, ingredient: ingredient});
    }
    const ingredients = getState().dragging.ingredients;
    dispatch({type: CHANGE_CONSTRUCTOR_INGREDIENTS, ingredients: ingredients});
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

export { ADD_BUN_TO_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  CHANGE_CONSTRUCTOR_INGREDIENTS,
  CLEAR_CONSTRUCTOR,
  addBunToConstructor,
  removeFromConstructor,
  clearConstructor,
  changeConstructorIngredients
}
