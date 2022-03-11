const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
const INCREASE_INGREDIENTS_COUNTER = 'INCREASE_INGREDIENTS_COUNTER';
const DECREASE_INGREDIENTS_COUNTER = 'DECREASE_INGREDIENTS_COUNTER';
const CLEAR_COUNTERS = 'CLEAR_COUNTERS';


const apiUrl = 'https://norma.nomoreparties.space/api/ingredients'
function getIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    fetch(apiUrl)
      .then(res => {
        if (res.ok) return res.json();
        return Promise.reject(res.status)
      })
      .then(data => {
        const bun = [];
        const sauce = [];
        const main = [];

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
      })
      .catch(errorStatus => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
          status: errorStatus
        });
      });
  };
}

export {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  INCREASE_INGREDIENTS_COUNTER,
  DECREASE_INGREDIENTS_COUNTER,
  CLEAR_COUNTERS,
  getIngredients
};
