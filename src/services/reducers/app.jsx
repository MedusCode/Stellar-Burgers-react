import { SWITCH_PAGE } from "../actions/app";

const initialState = {
  activePage: 'Constructor'
}

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_PAGE: {
      return {...state, activePage: action.activePage}
    }
    default: {
      return state;
    }
  }
}
