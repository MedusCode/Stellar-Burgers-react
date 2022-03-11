import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal'

const initialState = {
  currentIngedient: {},
  isOpen: false,
  type: ''
}

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        currentIngedient: action.ingredient || {},
        isOpen: true,
        type: action.ingredient ? 'ingredient' : 'order'
      }
    }
    case CLOSE_MODAL: {
      return {
        currentIngedient: {},
        isOpen: false,
        type: ''
      }
    }
    default: {
      return {...state}
    }
  }
}
