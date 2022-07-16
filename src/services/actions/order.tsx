import checkResponse from "../../assets/scripts/checkResponse";
import baseUrl from "../../assets/scripts/baseUrl";
import { CLEAR_CONSTRUCTOR } from './burger-constructor';
import { refreshTokenRequest } from "./user";
import IIngredient from "../../types/ingredient";
import { AppThunk } from "../../types/appThunk";
import { IOrderResponseBody } from "../../types/requests";
import { CLEAR_COUNTERS } from "./ingredients";

const MAKE_ORDER_REQUEST: 'MAKE_ORDER_REQUEST' = 'MAKE_ORDER_REQUEST';
const MAKE_ORDER_SUCCESS: 'MAKE_ORDER_SUCCESS' = 'MAKE_ORDER_SUCCESS';
const MAKE_ORDER_FAILED: 'MAKE_ORDER_FAILED' = 'MAKE_ORDER_FAILED';

interface IMakeOrderRequestAction {
  type: typeof MAKE_ORDER_REQUEST;
}

interface IMakeOrderSuccessAction {
  type: typeof MAKE_ORDER_SUCCESS;
  name: string;
  orderNum: number;
  orderIngredients: Array<IIngredient>;
}

interface IMakeOrderFailedAction {
  type: typeof MAKE_ORDER_FAILED;
}

const makeOrder: AppThunk = () => {
  return (dispatch, getState) => {
    const bun = getState().burgerConstructor.bun;
    const ingredients = getState().burgerConstructor.ingredients;
    const order = {
      ingredients: [bun._id, ...ingredients.map(ingredient => ingredient._id), bun._id]
    }

    dispatch({
      type: MAKE_ORDER_REQUEST
    })
    fetch(`${baseUrl}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('accessToken')
      },
      body: JSON.stringify(order)
    })
      .then(res => checkResponse<IOrderResponseBody>(res))
      .then(data => {
        if (data.success) {
          dispatch({
            type: MAKE_ORDER_SUCCESS,
            name: data.name,
            orderNum: data.order.number,
            orderIngredients: data.order.ingredients,
          })
          dispatch({type: CLEAR_CONSTRUCTOR});
          dispatch({type: CLEAR_COUNTERS});
        }
      })
      .catch(() => {
        refreshTokenRequest()
        dispatch({
          type: MAKE_ORDER_FAILED,
        });
      });
  }
}

export type TOrderActions = IMakeOrderFailedAction | IMakeOrderSuccessAction | IMakeOrderRequestAction;

export { MAKE_ORDER_FAILED, MAKE_ORDER_SUCCESS, MAKE_ORDER_REQUEST, makeOrder };
