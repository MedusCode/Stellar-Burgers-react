import React from 'react';
import styles from './order.module.css';
import { useSelector } from 'react-redux';
import { order as orderType } from '../../assets/scripts/propTypes'
import Compound from '../compound/compound.jsx';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import getOrderStatus from '../../assets/scripts/getOrderStatus';
import getData from '../../assets/scripts/getData';
import useOrderHandler from '../../services/hooks/useOrderHandler';

const Order = (props) => {
  const modalOrder = useSelector(store => store.modal.currentOrder);
  const fullPageOrder = useOrderHandler(props.order)
  const order = fullPageOrder ? fullPageOrder.order : modalOrder;
  console.log(fullPageOrder)

  const getIngredientsList = (ingredients) => {
    let ingredientsList = {};
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
    <div className={`${styles.container} mt-5`}>
      <h2 className={'text text_type_main-medium mb-2'}>{order.name}</h2>
      <span className={`${order.status === 'done' ? styles.done : ''} text text_type_main-default`}>
        {getOrderStatus(order.status)}
      </span>
      <h3 className={'text text_type_main-medium mt-15 mb-6'}>Состав:</h3>
      <Compound ingredientsList={getIngredientsList(order.ingredients)} />
      <div className={styles.footer}>
        <span className={`${styles.date} text text_type_main-default text_color_inactive`}>{getData(order.createdAt)}</span>
        <div className={styles.priceContainer}>
          <span className={`${styles.price} 'text text_type_digits-default`}>{order.price}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}

export default Order;