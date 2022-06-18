import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom'
import styles from './burger-constructor.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Cart from '../cart/cart';
import CurrencyIconLarge from '../currency-icon-large/currency-icon-large';
import { OPEN_MODAL } from '../../services/actions/modal'

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const isAuthorized = useSelector(store => store.user.isAuthorized);
  const { price, bun } = useSelector(store => ({
    price: store.burgerConstructor.price,
    bun: store.burgerConstructor.bun
  }))

  const openModal = () => {
    if (isAuthorized) dispatch({type: OPEN_MODAL, modalType: 'order'})
    else history.push({ pathname: '/login', state: {from: location} })
  }

  return (
    <section className={`${styles.constructor} pt-25`}>
      <Cart />
      <div className={`${styles.takeOrderContainer} mt-10 mr-4`}>
        <div className={`${styles.priceContainer} mr-10`}>
          <span className='text text_type_digits-medium mr-2'>{price}</span>
          <CurrencyIconLarge />
        </div>
        <Button type="primary" size="large" onClick={openModal} disabled={bun._id ? false : true}>Оформить заказ</Button>
      </div>
    </section>
  )
}

export default BurgerConstructor;
