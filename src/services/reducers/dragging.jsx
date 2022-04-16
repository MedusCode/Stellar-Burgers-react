import {START_DRAGGING, CHANGE_DRAGGING_POSSITION, STOP_DRAGGING } from '../actions/dragging'

const initialState = {
  ingredient: {},
  ingredients: [],
  initialIngredients: [],
  index: -1,
  draggingType: 'no',
}

export const draggingReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_DRAGGING: {
      return {
        ...state,
        ingredient: action.ingredient,
        ingredients: action.ingredients,
        initialIngredients: action.initialIngredients,
        draggingType: action.draggingType
      }
    }
    case CHANGE_DRAGGING_POSSITION: {
      const newArray = [...state.initialIngredients];
      newArray.splice(action.index, 0, state.ingredient)
      return {
        ...state,
        ingredients: newArray,
        index: action.index,
      }
    }
    case STOP_DRAGGING: {
      return {
        ...initialState
      };
    }
    default: {
      return state;
    }
  }
}
