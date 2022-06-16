import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal'

const initialState = {
  currentIngredient: {},

  confirmationType: '',

  isOpen: false,
  modalType: '',
  text: '',
  handler: undefined,
}

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        currentIngredient: action.ingredient || {},
        isOpen: true,
        modalType: action.modalType,
        confirmationType: action.confirmationType || '',
        text: action.text || '',
        handler: action.handler || undefined,
      }
    }
    case CLOSE_MODAL: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
