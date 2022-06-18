import { MAKE_ORDER_FAILED, MAKE_ORDER_SUCCESS, MAKE_ORDER_REQUEST } from '../actions/order';

const initialState = {
  name: '',
  orderNum: null,
  orderIngredients: [],

  orderRequest: false,
  orderSuccess: false,
  orderFailed: false,
}

export const orderReducer = (state = initialState, action) => {
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

