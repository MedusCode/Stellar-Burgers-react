import { nanoid } from 'nanoid';
import { AppThunk } from '../../types/appThunk';
import IIngredient from '../../types/ingredient';

const START_DRAGGING: 'START_DRAGGING' = 'START_DRAGGING';
const CHANGE_DRAGGING_INDEX: 'CHANGE_DRAGGING_INDEX' = 'CHANGE_DRAGGING_INDEX';
const STOP_DRAGGING: 'STOP_DRAGGING' = 'STOP_DRAGGING';

interface IStartDraggingAction {
  type: typeof START_DRAGGING;
  ingredient: IIngredient;
  ingredients: Array<IIngredient>;
  initialIngredients: Array<IIngredient>;
  draggingType: 'add' | 'move';
}

interface IChangeDraggingIndexAction {
  type: typeof CHANGE_DRAGGING_INDEX;
  index: number;
}

interface IStopDraggingAction {
  type: typeof STOP_DRAGGING;
}

const startAddDragging: AppThunk = (ingredient: IIngredient) => {
  return (dispatch, getState) => {
    const ingredients = getState().burgerConstructor.ingredients;
    const id = nanoid();
    dispatch({
      type: START_DRAGGING,
      ingredient: {...ingredient, nanoid: id},
      ingredients: [...ingredients],
      initialIngredients: [...ingredients],
      draggingType: 'add'
    })
  }
}

const startMoveDragging: AppThunk= (ingredient: IIngredient) => {
  return (dispatch, getState) => {
    const ingredients = getState().burgerConstructor.ingredients;
    const initialIngredients = ingredients.filter(item => item.nanoid !== ingredient.nanoid);
    dispatch({
      type: START_DRAGGING,
      ingredient: ingredient,
      ingredients: [...ingredients],
      initialIngredients: initialIngredients,
      draggingType: 'move'
    })
  }
}

export type TDraggingActions = IChangeDraggingIndexAction | IStartDraggingAction | IStopDraggingAction;

export { START_DRAGGING, CHANGE_DRAGGING_INDEX, STOP_DRAGGING, startAddDragging, startMoveDragging };
