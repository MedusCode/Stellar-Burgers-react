import IIngredient from '../../types/ingredient';
import { MAKE_ORDER_FAILED, MAKE_ORDER_SUCCESS, MAKE_ORDER_REQUEST, TOrderActions } from '../actions/order';

interface IOrderState {
  name: string;
  orderNum: number | null;
  orderIngredients: Array<IIngredient>;

  orderRequest: boolean;
  orderSuccess: boolean;
  orderFailed: boolean;
}

const initialState: IOrderState = {
  name: '',
  orderNum: null,
  orderIngredients: [],

  orderRequest: false,
  orderSuccess: false,
  orderFailed: false,
}

export const orderReducer = (state = initialState, action: TOrderActions): IOrderState => {
  switch (action.type) {
    case MAKE_ORDER_REQUEST: {
      return {
        ...initialState,
        orderRequest: true
      }
    }
    case MAKE_ORDER_SUCCESS: {
      return {
        ...state,
        orderSuccess: true,
        orderRequest: false,
        orderFailed: false,
        name: action.name,
        orderNum: action.orderNum,
        orderIngredients: action.orderIngredients
      }
    }
    case MAKE_ORDER_FAILED: {
      return {
        ...initialState,
        orderFailed: true,
      }
    }
    default: {
      return state;
    }
  }
}

