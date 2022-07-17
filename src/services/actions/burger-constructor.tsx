import { AppThunk } from '../../types/appThunk';
import IIngredient, { TBun } from '../../types/ingredient';
import { INCREASE_INGREDIENTS_COUNTER, DECREASE_INGREDIENTS_COUNTER, CLEAR_COUNTERS } from './ingredients'

const ADD_BUN_TO_CONSTRUCTOR: 'ADD_BUN_TO_CONSTRUCTOR' = 'ADD_BUN_TO_CONSTRUCTOR';
const REMOVE_INGREDIENT_FROM_CONSTRUCTOR: 'REMOVE_INGREDIENT_FROM_CONSTRUCTOR' = 'REMOVE_INGREDIENT_FROM_CONSTRUCTOR';
const CLEAR_CONSTRUCTOR: 'CLEAR_CONSTRUCTOR' = 'CLEAR_CONSTRUCTOR';
const CHANGE_CONSTRUCTOR_INGREDIENTS: 'CHANGE_CONSTRUCTOR_INGREDIENTS' = 'CHANGE_CONSTRUCTOR_INGREDIENTS';

interface IAddBunToConstructorAction {
  type: typeof ADD_BUN_TO_CONSTRUCTOR;
  bun: TBun;
}

interface IRemoveIngredientFromConstructorAction {
  type: typeof REMOVE_INGREDIENT_FROM_CONSTRUCTOR;
  ingredient: IIngredient;
}

interface IClearConstructor {
  type: typeof CLEAR_CONSTRUCTOR;
}

interface IChangeConstructorIngredients {
  type: typeof CHANGE_CONSTRUCTOR_INGREDIENTS;
  ingredients: Array<IIngredient>;
}

const addBunToConstructor: AppThunk = (bun: TBun) => {
  return (dispatch) => {
    dispatch({type: ADD_BUN_TO_CONSTRUCTOR, bun: bun});
    dispatch({type: INCREASE_INGREDIENTS_COUNTER, ingredient: bun});
  }
}

const changeConstructorIngredients: AppThunk = (isNewIngredient: boolean) => {
  return (dispatch, getState) => {
    if (isNewIngredient) {
      const ingredient = getState().dragging.ingredient;
      dispatch({type: INCREASE_INGREDIENTS_COUNTER, ingredient: ingredient});
    }
    const ingredients = getState().dragging.ingredients;
    dispatch({type: CHANGE_CONSTRUCTOR_INGREDIENTS, ingredients: ingredients});
  }
}

const removeFromConstructor: AppThunk = (ingredient: IIngredient) => {
  return (dispatch) => {
    dispatch({type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR, ingredient: ingredient});
    dispatch({type: DECREASE_INGREDIENTS_COUNTER, ingredient: ingredient});
  }
}

const clearConstructor: AppThunk = () => {
  return (dispatch) => {
    dispatch({type: CLEAR_CONSTRUCTOR});
    dispatch({type: CLEAR_COUNTERS});
  }
}

export type TBurgerConstructorActions = 
  IChangeConstructorIngredients 
  | IClearConstructor 
  | IRemoveIngredientFromConstructorAction 
  | IAddBunToConstructorAction

export { ADD_BUN_TO_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  CHANGE_CONSTRUCTOR_INGREDIENTS,
  CLEAR_CONSTRUCTOR,
  addBunToConstructor,
  removeFromConstructor,
  clearConstructor,
  changeConstructorIngredients
}
