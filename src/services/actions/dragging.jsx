import { nanoid } from 'nanoid';
const START_DRAGGING = 'STAPT_DRAGGING';
const CHANGE_DRAGGING_POSSITION = 'CHANGE_DRAGGING_POSSITION';
const STOP_DRAGGING = 'STOP_DRAGGING';

const startAddDragging = (ingredient) => {
  return (dispatch, getState) => {
    const ingredients = getState().burgerConstructor.ingredients;
    const id = nanoid();
    dispatch({
      type: START_DRAGGING,
      ingredient: {...ingredient, nanoid: id},
      ingredients: [ ...ingredients]
    })
  }
}

const startMoveDragging = (ingredient) => {
  return (dispatch, getState) => {
    const ingredients = getState().burgerConstructor.ingredients.filter(item => item.nanoid !== ingredient.nanoid);
    dispatch({
      type: START_DRAGGING,
      ingredient: {...ingredient},
      ingredients: [ ...ingredients]
    })
  }
}

export { START_DRAGGING, CHANGE_DRAGGING_POSSITION, STOP_DRAGGING, startAddDragging, startMoveDragging };
