import checkResponse from "../../assets/scripts/checkResponse";
import baseUrl from "../../assets/scripts/baseUrl";
import IIngredient from "../../types/ingredient";
import { AppThunk } from "../../types/appThunk";
import { IIngredientsResponseBody } from "../../types/requests";

const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';
const INCREASE_INGREDIENTS_COUNTER: 'INCREASE_INGREDIENTS_COUNTER' = 'INCREASE_INGREDIENTS_COUNTER';
const DECREASE_INGREDIENTS_COUNTER: 'DECREASE_INGREDIENTS_COUNTER' = 'DECREASE_INGREDIENTS_COUNTER';
const CLEAR_COUNTERS: 'CLEAR_COUNTERS' = 'CLEAR_COUNTERS';

interface IGetIngredientsRequestAction {
  type: typeof GET_INGREDIENTS_REQUEST;
}

interface IGetIngredientsSuccessAction {
  type: typeof GET_INGREDIENTS_SUCCESS;
  bun: Array<IIngredient>;
  sauce: Array<IIngredient>;
  main: Array<IIngredient>; 
}

interface IGetIngredientsFailed {
  type: typeof GET_INGREDIENTS_FAILED;
  status?: number;
}

interface IIncreaseIngredientCountsAction {
  type: typeof INCREASE_INGREDIENTS_COUNTER;
  ingredient: IIngredient;
}

interface IDecreaseIngredientCountsAction {
  type: typeof DECREASE_INGREDIENTS_COUNTER;
  ingredient: IIngredient;
}

interface IClearCounters {
  type: typeof CLEAR_COUNTERS;
}

const getIngredients: AppThunk = () => {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    fetch(`${baseUrl}/ingredients`)
      .then(res => checkResponse<IIngredientsResponseBody>(res))
      .then(data => {
        if (data.data) {
          const bun: Array<IIngredient> = [];
          const sauce: Array<IIngredient> = [];
          const main: Array<IIngredient> = [];

          data.data.forEach((ingredient) => {
            ingredient.type === 'bun' && bun.push(ingredient)
            ingredient.type === 'sauce' && sauce.push(ingredient);
            ingredient.type === 'main' && main.push(ingredient);
          })

          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            bun: bun,
            sauce: sauce,
            main: main
          });
        }
      })
      .catch(error => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
          status: error.status
        });
      });
  };
}

export type TIngredientsActions = 
  IGetIngredientsFailed
  | IGetIngredientsSuccessAction
  | IGetIngredientsRequestAction
  | IIncreaseIngredientCountsAction
  | IDecreaseIngredientCountsAction
  | IClearCounters

export {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  INCREASE_INGREDIENTS_COUNTER,
  DECREASE_INGREDIENTS_COUNTER,
  CLEAR_COUNTERS,
  getIngredients
};
