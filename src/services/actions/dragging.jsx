import { nanoid } from 'nanoid';
const START_DRAGGING = 'STAPT_DRAGGING';
const CHANGE_DRAGGING_INDEX = 'CHANGE_DRAGGING_INDEX';
const STOP_DRAGGING = 'STOP_DRAGGING';

const startAddDragging = (ingredient) => {
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

const startMoveDragging = (ingredient) => {
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

export { START_DRAGGING, CHANGE_DRAGGING_INDEX, STOP_DRAGGING, startAddDragging, startMoveDragging };
