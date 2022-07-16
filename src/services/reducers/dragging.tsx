import IIngredient from '../../types/ingredient'
import {START_DRAGGING, CHANGE_DRAGGING_INDEX, STOP_DRAGGING, TDraggingActions } from '../actions/dragging'

interface IDraggingState {
  ingredient: IIngredient;
  ingredients: Array<IIngredient>;
  initialIngredients: Array<IIngredient>;
  index: number;
  draggingType: 'add' | 'move' | 'notDrugging';
}

const initialState: IDraggingState = {
  ingredient: {} as IIngredient,
  ingredients: [],
  initialIngredients: [],
  index: -1,
  draggingType: 'notDrugging',
}

export const draggingReducer = (state = initialState, action: TDraggingActions): IDraggingState => {
  switch (action.type) {
    case START_DRAGGING: {
      return {
        ...state,
        ingredient: action.ingredient,
        ingredients: action.ingredients,
        initialIngredients: action.initialIngredients,
        draggingType: action.draggingType,
      }
    }
    case CHANGE_DRAGGING_INDEX: {
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
