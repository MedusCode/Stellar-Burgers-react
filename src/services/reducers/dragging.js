import { nanoid } from 'nanoid';
import {
  START_DRAGGING,
  CHANGE_DRAGGING_POSSITION } from '../actions/dragging'

const initialState = {
  ingredient: {},
  constructorArray: [],
  previousIndex: 0,
  initialArray: [],
  newIndex: 0
}

export const draggingReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_DRAGGING: {
      const id = nanoid();
      return {
        ...state,
        ingredient: {...action.ingredient, nanoid: id},
        constructorArray: [{...action.ingredient, nanoid: id}, ...action.constructorArray],
        initialArray: action.initialArray ? {...action.initialArray} : [],
        previousIndex: 0,
        newIndex: 0
      }
    }
    case CHANGE_DRAGGING_POSSITION: {
      if (state.previousIndex !== action.newIndex) {
        const newArray = state.constructorArray;
        newArray.splice(state.previousIndex, 1);
        newArray.splice(action.newIndex, 0, state.ingredient)
        return {
          ...state,
          constructorArray: newArray,
          previousIndex: action.newIndex,
          newIndex: action.newIndex,
        }
      }
    }
    default: {
      return {...state}
    }
  }
}
