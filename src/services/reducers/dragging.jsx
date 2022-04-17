import {START_DRAGGING, CHANGE_DRAGGING_POSSITION } from '../actions/dragging'

const initialState = {
  ingredient: {},
  constructorArray: [],
  previousIndex: 0,
  newIndex: 0
}

export const draggingReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_DRAGGING: {
      return {
        ...state,
        ingredient: action.ingredient,
        constructorArray: action.constructorArray,
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
      return state;
    }
  }
}
