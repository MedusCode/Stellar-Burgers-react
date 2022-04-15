import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import styles from './cart-elements.module.css';
import ConstructorCard from '../constructor-card/constructor-card'
import CartElement from '../cart-element/cart-element';

const CartElements = () => {
  const dispatch = useDispatch();
  const cartContainerRef = React.useRef(null);
  const activeIngredients = useSelector(store => store.burgerConstructor.ingredients)
  const { temporaryIngredients, isDragging } = useSelector(store => ({
    temporaryIngredients: store.dragging.ingredients,
    isDragging: store.dragging.isDragging
  }))
  const [ingredients, setIngredients] = React.useState([]);

  React.useEffect(() => {
    if (isDragging) setIngredients(temporaryIngredients)
    else setIngredients(activeIngredients)
  }, [isDragging, temporaryIngredients, activeIngredients])

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
