import { useSelector } from 'react-redux';
import IIngredient from '../../types/ingredient';
import IOrder, { IOrderWithIngredientList } from '../../types/order';

const useOrderHandler = (initialOrder: IOrder | undefined): IOrderWithIngredientList | null => {
  const { bun, sauce, main } = useSelector((store: any) => ({
    bun: store.ingredients.bun,
    sauce: store.ingredients.sauce,
    main: store.ingredients.main
  }));
  const ingredients: Array<IIngredient> = [...bun, ...sauce, ...main];
  let order = {} as IOrderWithIngredientList;

  if (!initialOrder) return null;

  const assignOrderIngredients = () => {
    const ingredientsId: Array<string> = initialOrder.ingredients;
    const ingredientsList = ingredientsId.map(ingredientId => 
      ingredients.find(ingredient => ingredient._id === ingredientId) 
      || {name: 'Ингредиент не найден'} as IIngredient);
    order = {...initialOrder, ingredients: ingredientsList, price: 0};
  }
  assignOrderIngredients();

  const setOrderPrice = () => {
    let price: number = 0;
    order.ingredients.forEach(ingredient => {
      price += ingredient.price
    })
    order.price = price;
  }
  setOrderPrice();

  return order
}

export default useOrderHandler;