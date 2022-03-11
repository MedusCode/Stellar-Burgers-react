import { MAKE_ORDER_FAILED, MAKE_ORDER_SUCCESS, MAKE_ORDER_REQUEST } from '../actions/order';

const initialState = {
  name: '',
  orderNum: 0,
  orderIngredients: [],

  orderRequest: false,
  orderSuccess: false,
  orderFailed: false,
  errorCode: ''
}

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_ORDER_REQUEST: {
      return {
        ...state,
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
        ...state,
        orderSuccess: false,
        orderRequest: false,
        orderFailed: true,
        name: '',
        orderNum: 0,
        errorCode: action.errorStatus,
        orderIngredients: []
      }
    }
    default: {
      return {...state}
    }
  }
}

