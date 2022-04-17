import React from 'react';
import styles from './cart.module.css';
import { useSelector } from 'react-redux';
import ConstructorBunCard from '../constructor-bun-card/constructor-bun-card';
import CartElement from '../cart-element/cart-element';


const Cart = () => {
  const [bun, setBun] = React.useState({});
  const elementsContainerRef = React.useRef(null);
  const constructorIngredients = useSelector(store => store.burgerConstructor.ingredients);
  const { draggingIndredientIndex, draggingType } =  useSelector(store => ({
    draggingIndredientIndex: store.dragging.index,
    draggingType: store.dragging.draggingType,
  }));

  React.useEffect(() => {
    const sectionListSizing = () => {
      elementsContainerRef.current.style.maxHeight = `${window.innerHeight - elementsContainerRef.current.offsetTop - 285}px`;
    }

    window.addEventListener('resize', sectionListSizing);
    sectionListSizing()

    return () => {
      window.removeEventListener('resize', sectionListSizing);
    }
  }, [])

  return (
    <>
      <div className={styles.cart}>
        <ConstructorBunCard type='top' bun={bun} setBun={setBun} />
        <ul className={styles.ingredientsContainer} ref={elementsContainerRef}>
          {constructorIngredients.map((item, index) => (<CartElement index={index} key={item.nanoid} />))}
          {(draggingIndredientIndex >= 0 && draggingType === 'add' || constructorIngredients.length === 0)
              && <CartElement index={constructorIngredients.length} />}
        </ul>
        <ConstructorBunCard type='bottom' bun={bun} setBun={setBun} />
      </div>
    </>
  )
}

export default Cart;
