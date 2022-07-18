import { FC } from 'react';
import styles from './order.module.css';
import { useSelector } from '../../services/hooks/reduxHooks';
import Composition from '../composition/composition';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import getOrderStatus from '../../assets/scripts/getOrderStatus';
import getData from '../../assets/scripts/getData';
import useOrderHandler from '../../services/hooks/useOrderHandler';
import IOrder from '../../types/order';
import IIngredient from '../../types/ingredient'

interface IOrderProps {
  order?: IOrder;
}

const Order: FC<IOrderProps> = (props) => {
  const { isModalOpened, modalOrder } = useSelector(store => ({
    isModalOpened: store.modal.isOpen,
    modalOrder: store.modal.currentOrder
  }));
  const fullPageOrder = useOrderHandler(props.order);
  const order = props.order ? fullPageOrder : modalOrder;

  if (!order) return (
    <span>Заказ ее найден :(</span>
  )

  const getIngredientsList = (ingredients: Array<IIngredient>): Array<IIngredient> => {
    let ingredientsList = {} as {[id: string]: IIngredient & { amount: number } };
    ingredients.forEach(ingredient => {
      if (Object.keys(ingredientsList).includes(ingredient._id)) {
        ingredientsList[ingredient._id].amount++;
      }
      else {
        ingredientsList[ingredient._id] = {...ingredient, amount: 1};
      }
    })
    return Object.values(ingredientsList);
  }

  return (
    <div className={styles.container}>
      <span className={`${styles.title} ${!isModalOpened ? styles.titleCenter : ''} text text_type_digits-default mb-5`}>{`#${order.number}`}</span>
      <h2 className={'text text_type_main-medium mb-2'}>{order.name}</h2>
      <span className={`${order.status === 'done' ? styles.done : ''} text text_type_main-default`}>
        {getOrderStatus(order.status)}
      </span>
      <h3 className={'text text_type_main-medium mt-15 mb-6'}>Состав:</h3>
      <Composition compositionIngredients={getIngredientsList(order.ingredients)} />
      <div className={styles.footer}>
        <span className='text text_type_main-default text_color_inactive'>{getData(order.createdAt)}</span>
        <div className={styles.priceContainer}>
          <span className={'text text_type_digits-default'}>{order.price}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}

export default Order;
