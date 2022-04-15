import {START_DRAGGING, CHANGE_DRAGGING_POSSITION, STOP_DRAGGING } from '../actions/dragging'

const initialState = {
  ingredient: {},
  ingredients: [
    {
      _id: '60d3b41abdacab0026a733d2',
      name: 'Кристаллы марсианских альфа-сахаридов',
      type: 'main',
      proteins: 234,
      fat: 432,
      carbohydrates: 111,
      calories: 189,
      price: 762,
      image: 'https://code.s3.yandex.net/react/code/core.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/core-large.png',
      __v: 0
    },
    {
      _id: '60d3b41abdacab0026a733d3',
      name: 'Мини-салат Экзо-Плантаго',
      type: 'main',
      proteins: 1,
      fat: 2,
      carbohydrates: 3,
      calories: 6,
      price: 4400,
      image: 'https://code.s3.yandex.net/react/code/salad.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/salad-large.png',
      __v: 0
    },
    {
      _id: '60d3b41abdacab0026a733d4',
      name: 'Сыр с астероидной плесенью',
      type: 'main',
      proteins: 84,
      fat: 48,
      carbohydrates: 420,
      calories: 3377,
      price: 4142,
      image: 'https://code.s3.yandex.net/react/code/cheese.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/cheese-large.png',
      __v: 0
    }
  ],
  initialIngredients: [],
  index: -1,
  isDragging: false
}

export const draggingReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_DRAGGING: {
      return {
        ...state,
        ingredient: action.ingredient,
        ingredients: action.ingredients,
        initialIngredients: action.ingredients,
        isDragging: true
      }
    }
    case CHANGE_DRAGGING_POSSITION: {
      if (state.index !== action.index) {
        const newArray = [...state.initialIngredients];
        newArray.splice(action.index, 0, state.ingredient)
        return {
          ...state,
          ingredients: newArray,
          index: action.index
        }
      }
      else return state;
    }
    case STOP_DRAGGING: {
      return {
        ...initialState
      };
    }
    default: {
      return state;
    }
  }
}
