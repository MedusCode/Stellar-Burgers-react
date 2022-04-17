import React from "react";
import { useSelector } from 'react-redux';
import styles from './cart-elements.module.css';
import CartElement from '../cart-element/cart-element';

const CartElements = () => {
  const cartContainerRef = React.useRef(null);
  const constructorIngredients = useSelector(store => store.burgerConstructor.ingredients);
  const draggingIndredientIndex =  useSelector(store => store.dragging.index);

  React.useEffect(() => {
    const sectionListSizing = () => {
      cartContainerRef.current.style.maxHeight = `${window.innerHeight - cartContainerRef.current.offsetTop - 285}px`;
    }

    window.addEventListener('resize', sectionListSizing);
    sectionListSizing()

    return () => {
      window.removeEventListener('resize', sectionListSizing);
    }
  }, [])

  return (
    <div className={styles.container} ref={cartContainerRef}>
        {constructorIngredients.map((item, index) => {
          return (<CartElement index={index} key={item.nanoid} />)
        })}
        <CartElement index={constructorIngredients.length} />
    </div>
  )
}

export default CartElements;
