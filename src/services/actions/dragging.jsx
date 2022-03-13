import { nanoid } from 'nanoid';
const START_DRAGGING = 'STAPT_DRAGGING';
const CHANGE_DRAGGING_POSSITION = 'CHANGE_DRAGGING_POSSITION';

const startDragging = (ingredient, constructorArray) => {
  return (dispatch) => {
    const id = nanoid();
    dispatch({
      type: START_DRAGGING,
      ingredient: {...ingredient, nanoid: id},
      constructorArray: [{...ingredient, nanoid: id}, ...constructorArray]
    })
  }
}

export { START_DRAGGING, CHANGE_DRAGGING_POSSITION, startDragging };
