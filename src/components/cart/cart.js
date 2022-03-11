import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './cart.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { nanoid } from 'nanoid';
import whiteBun from '../../assets/images/whiteBun.png'
import { removeFromConstructor } from '../../services/actions/burger-constructor';

const Cart = () => {
  const dispatch = useDispatch();
  const { bun, ingredients } = useSelector(store => ({
    bun: store.burgerConstructor.bun,
    ingredients: store.burgerConstructor.ingredients
  }))
  const cartContainerRef = React.useRef(null);

  const removeElement = (ingredient) => {
    dispatch(removeFromConstructor(ingredient));
  }

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
    <>
      <ul className={styles.cart}>
        <li className='ml-4 mr-4 pl-8' key={nanoid()}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun._id ? `${bun.name} (верх)` : 'Перетащите сюда булку'}
            price={bun._id ? bun.price : ''}
            thumbnail={bun._id ? bun.image : whiteBun}
          />
        </li>
        <div className={styles.container} ref={cartContainerRef}>
          {ingredients.length > 0 ? ingredients.map((item) => {
            return (
            <li className={`${styles.ingredient} ml-4 mr-4`} key={item.nanoid}>
              <DragIcon type="primary" />
              <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
              handleClose={() => {removeElement(item)}}
              />
            </li>
            )
          })
          :
          <li className={`${styles.ingredient} ml-4 mr-4`}>
            <div className={`${styles.empty} ml-8`}></div>
          </li>
          }
        </div>
        <li className='ml-4 mr-4 pl-8' key={nanoid()}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun._id ? `${bun.name} (низ)` : 'Перетащите сюда булку'}
            price={bun._id ? bun.price : ''}
            thumbnail={bun._id ? bun.image : whiteBun}
          />
        </li>
      </ul>
    </>
  )
}

export default Cart;
