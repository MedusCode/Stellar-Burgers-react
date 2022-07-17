import IIngredient from '../../types/ingredient'
import { IOrderWithIngredientList } from '../../types/order';
import { OPEN_MODAL, CLOSE_MODAL, TModalActions } from '../actions/modal'

interface IModalState {
  currentIngredient: IIngredient | null;
  currentOrder: IOrderWithIngredientList | null;

  isOpen: boolean;
  modalType: 'order-details' | 'confirmation' | 'request' | 'ingredient' | 'order' | '';
  text: string;
  handler: () => void;
}

const initialState: IModalState = {
  currentIngredient: null,
  currentOrder: null,

  isOpen: false,
  modalType: '',
  text: '',
  handler: () => {}
}

export const modalReducer = (state = initialState, action: TModalActions): IModalState => {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        currentIngredient: action.ingredient || null,
        currentOrder: action.order || null,
        isOpen: true,
        modalType: action.modalType,
        text: action.text || '',
        handler: action.handler || state.handler,
      }
    }
    case CLOSE_MODAL: {
      return {
        ...initialState
      };
    }
    default: {
      return state;
    }
  }
}
