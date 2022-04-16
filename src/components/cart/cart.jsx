import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from "react-dnd";
import styles from './cart.module.css';
import CartElements from '../cart-elements/cart-elements'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import whiteBun from '../../assets/images/whiteBun.png'
import { addToConstructor } from '../../services/actions/burger-constructor';

const Cart = () => {
  const dispatch = useDispatch();
  const bun = useSelector(store => store.burgerConstructor.bun)
  const allBuns = useSelector(store => store.ingredients.bun)
  const [temporaryBun, setTemporaryBun] = React.useState({})

  const [{bunItem, upperBunIsOver}, upperBunTarget] = useDrop({
    accept: "bun",
    collect: monitor => ({
      upperBunIsOver: monitor.isOver(),
      bunItem: monitor.getItem()
    }),
    drop() {
      dispatch(addToConstructor(temporaryBun))
    }
  });

  const [{lowerBunIsOver}, lowerBunTarget] = useDrop({
    accept: "bun",
    collect: monitor => ({
      lowerBunIsOver: monitor.isOver(),
    }),
    drop() {
      dispatch(addToConstructor(temporaryBun))
    }
  });

  React.useEffect(() => {
    if (upperBunIsOver || lowerBunIsOver) {
      const draggingBun = allBuns.find(bun => bun._id === bunItem.id)
      setTemporaryBun(draggingBun)
    }
    (!upperBunIsOver && !lowerBunIsOver) && setTemporaryBun({})
  }, [upperBunIsOver, lowerBunIsOver])

  return (
    <>
      <ul className={styles.cart}>
        <li className={`${temporaryBun._id ? styles.hidden : ''} ml-4 mr-4 pl-8`} ref={upperBunTarget}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={temporaryBun._id ? `${temporaryBun.name} (верх)` : bun._id ? `${bun.name} (верх)` : 'Перетащите сюда булку'}
            price={temporaryBun._id ? temporaryBun.price : bun._id ? bun.price : ''}
            thumbnail={temporaryBun._id ? temporaryBun.image : bun._id ? bun.image : whiteBun}
          />
        </li>
        <CartElements />
        <li className={`${temporaryBun._id ? styles.hidden : ''} ml-4 mr-4 pl-8`} ref={lowerBunTarget}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={temporaryBun._id ? `${temporaryBun.name} (низ)` : bun._id ? `${bun.name} (низ)` : 'Перетащите сюда булку'}
            price={temporaryBun._id ? temporaryBun.price : bun._id ? bun.price : ''}
            thumbnail={temporaryBun._id ? temporaryBun.image : bun._id ? bun.image : whiteBun}
          />
        </li>
      </ul>
    </>
  )
}

export default Cart;
