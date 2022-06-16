import checkResponse from "../../assets/scripts/checkResponse";
import baseUrl from "../../assets/scripts/baseUrl";
import { clearConstructor } from './burger-constructor'

const MAKE_ORDER_REQUEST = 'MAKE_ORDER_REQUEST';
const MAKE_ORDER_SUCCESS = 'MAKE_ORDER_SUCCESS';
const MAKE_ORDER_FAILED = 'MAKE_ORDER_FAILED';

const makeOrder = () => {
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
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    })
      .then(checkResponse)
      .then(data => {
        if (data.success) {
          dispatch({
            type: MAKE_ORDER_SUCCESS,
            name: data.name,
            orderNum: data.order.number,
            orderIngredients: order,
          })
          dispatch(clearConstructor())
        }
      })
      .catch(() => {
        dispatch({
          type: MAKE_ORDER_FAILED,
        });
      });
  }
}

export { MAKE_ORDER_FAILED, MAKE_ORDER_SUCCESS, MAKE_ORDER_REQUEST, makeOrder };
