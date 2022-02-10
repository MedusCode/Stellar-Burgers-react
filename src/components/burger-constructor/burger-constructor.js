import React from 'react';
import styles from './burger-constructor.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Cart from '../cart/cart';
import cartIngredients from '../cart-ingredients';
import CurrencyIconLarge from '../currency-icon-large/currency-icon-large';

const BurgerConstructor = () => {
  const [cart, setCart] = React.useState(cartIngredients);
  const [price, setPrice] = React.useState(0)

  React.useEffect(() => {
    const newPrice = cart.reduce((prev, curr) => prev + curr.price, 0);
    setPrice(newPrice);
  }, [cart])

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
