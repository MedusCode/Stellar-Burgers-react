import React from 'react';
import styles from './cart.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Cart = (props) => {
  const cartContainerRef = React.useRef(null);

  React.useEffect(() => {
    const sectionListSizing = () => {
      cartContainerRef.current.style.maxHeight = `${window.innerHeight - cartContainerRef.current.offsetTop - 292}px`;
    }

    window.addEventListener('resize', sectionListSizing);
    sectionListSizing()

    return () => {
      window.removeEventListener('resize', sectionListSizing);
    }
  }, [])

  return (
    <ul className={styles.cart} key={0}>
      <li className='ml-4 mr-4 pl-8'>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${props.cart[0].name} (верх)`}
          price={props.cart[0].price}
          thumbnail={props.cart[0].image}
        />
      </li>
      <div className={styles.container} ref={cartContainerRef}>
        {props.cart.map((item, index) => {
          if (index !== 0) {
            return (
            <li className={`${styles.ingredient} ml-4 mr-4`} key={index}>
              <DragIcon type="primary" />
              <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
              />
            </li>
            )
          }
        })}
      </div>
      <li className='ml-4 mr-4 pl-8' key={props.cart.length}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${props.cart[0].name} (низ)`}
          price={props.cart[0].price}
          thumbnail={props.cart[0].image}
        />
      </li>
    </ul>
  )
}

export default Cart;
