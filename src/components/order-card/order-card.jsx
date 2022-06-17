import React from 'react';
import { nanoid } from 'nanoid';
import getData from '../../assets/scripts/getData';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styles from './order-card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OPEN_MODAL } from '../../services/actions/modal';
import getOrderStatus from '../../assets/scripts/getOrderStatus';


const OrderCard = ({ order, displayStatus }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const handleClick = () => {
    dispatch({ type: OPEN_MODAL, modalType: 'order', order: order })
    window.history.replaceState(null, 'Детали заказа', `${location.pathname}/${order._id}`)
  }

  return (
    <li className={`${styles.container} p-6 mb-4`} onClick={handleClick}>
      <span className='text text_type_digits-default'>{`#${order.number}`}</span>
      <span className={`${styles.date} text text_type_main-default text_color_inactive`}>{getData(order.createdAt)}</span>
      {displayStatus
        ? <div className={styles.nameContainer}>
            <h2 className={'text text_type_main-medium mb-2'}>{order.name}</h2>
            <span className={`${order.status === 'done' ? styles.done : ''} text text_type_main-default`}>
              {getOrderStatus(order.status)}
            </span> 
          </div>
        : <h2 className={`${styles.name} text text_type_main-medium`}>{order.name}</h2>  
      }
      <div className={styles.ingredientsContainer}>
        {order.ingredients.slice(0, 6).reverse().map((ingredient, index) => 
          <div className={styles.ingredient} key={nanoid()}>
            <img 
              className={`${styles.ingredientImage} ${order.ingredients.length > 6 && index === 0 ? styles.ingredientsOver : ''}`} 
              src={ingredient.image} 
              key={nanoid()} 
            />
            {order.ingredients.length > 6 && index === 0 && 
              <span className={`${styles.counter} text text_type_main-default`}>{`+${order.ingredients.length - 6}`}</span>
            }
          </div>
        )}
      </div>
      <div className={styles.priceContainer}>
        <span className={`${styles.price} 'text text_type_digits-default`}>{order.price}</span>
        <CurrencyIcon type="primary" />
      </div>
    </li>
  )
}

export default OrderCard;