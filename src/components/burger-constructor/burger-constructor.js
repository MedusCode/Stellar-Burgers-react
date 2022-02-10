import React from 'react';
import styles from './burger-constructor.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Cart from '../cart/cart';
import CurrencyIconLarge from '../currency-icon-large/currency-icon-large';

const BurgerConstructor = ({ ingredientsData }) => {
  const [cart, setCart] = React.useState(ingredientsData);
  const [price, setPrice] = React.useState(0)


  React.useEffect(() => {
    setCart(ingredientsData);
    setPrice(cart.reduce((prev, curr) => prev + curr.price, 0));
  })

  return (
    cart.length > 0 ?
    <section className={`${styles.constructor} pt-25`}>
      <Cart cart={cart} setCart={setCart} />
      <div className={`${styles.takeOrderContainer} mt-10 mr-4`}>
        <div className={`${styles.priceContainer} mr-10`}>
          <span className='text text_type_digits-medium mr-2'>{price}</span>
          <CurrencyIconLarge />
        </div>
        <Button type="primary" size="large">Оформить заказ</Button>
      </div>
    </section>
    :
    <span className={`${styles.clearCart} text text_type_main-large`}>Корзина пуста</span>
  )
}

export default BurgerConstructor;
