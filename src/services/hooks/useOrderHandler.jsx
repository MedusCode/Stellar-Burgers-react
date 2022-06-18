import React from 'react';
import { useSelector } from 'react-redux';

const useOrderHandler = (initialOrder) => {
  const { bun, sauce, main } = useSelector(store => ({
    bun: store.ingredients.bun,
    sauce: store.ingredients.sauce,
    main: store.ingredients.main
  }));
  const ingredients = [...bun, ...sauce, ...main];
  let order = null;

  if (!initialOrder) return null;

  const changeOrderIngredients = () => {
    const ingredientsId = initialOrder.ingredients;
    const ingredientsList = ingredientsId.map(ingredientId => ingredients.find(ingredient => ingredient._id === ingredientId));
    order = {...initialOrder, ingredients: ingredientsList};
  }
  changeOrderIngredients();

  const setOrderPrice = () => {
    let price = 0;
    order.ingredients.forEach(ingredient => {
      price += ingredient.price
    })
    order.price = price;
  }
  setOrderPrice();

  return { 
    order
  }
}

export default useOrderHandler;