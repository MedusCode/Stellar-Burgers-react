import React from "react";
import { useSelector } from 'react-redux';
import styles from './cart-elements.module.css';
import CartElement from '../cart-element/cart-element';

const CartElements = () => {
  const cartContainerRef = React.useRef(null);
  const activeIngredients = useSelector(store => store.burgerConstructor.ingredients)
  const { temporaryIngredients, draggingType } = useSelector(store => ({
    temporaryIngredients: store.dragging.ingredients,
    draggingType: store.dragging.draggingType,
  }))
  const [ingredients, setIngredients] = React.useState([]);

  React.useEffect(() => {
    if (draggingType !== 'no') setIngredients(temporaryIngredients)
    else setIngredients(activeIngredients)
  }, [draggingType, temporaryIngredients, activeIngredients])

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
      {ingredients.length > 0
        ? ingredients.map((item, index) => {
            return (<CartElement item={item} index={index} key={item.nanoid} />)
          })
        : <CartElement />
      }
    </div>
  )
}

export default CartElements;
