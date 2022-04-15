import React from "react";
import { useDispatch } from 'react-redux';
import styles from './cart-element.module.css';
import ConstructorCard from '../constructor-card/constructor-card';
import { useDrop } from "react-dnd";
import { CHANGE_DRAGGING_POSSITION, STOP_DRAGGING } from '../../services/actions/dragging';

const CartElement = ({ item, index }) => {
  const dispatch = useDispatch();

  const [{ isOver }, ingredientTarget] = useDrop({
    accept: "ingredient",
    collect: monitor => ({
      isOver: monitor.isOver(),
    })
  });

  React.useEffect(() => {
    isOver && dispatch({type: CHANGE_DRAGGING_POSSITION, index: index})
  }, [isOver])

  return (
    <div ref={ingredientTarget}>
      { item ? <ConstructorCard ingredient={item} /> :
        <li className={`${styles.ingredient} ml-4 mr-4`}>
          <div className={`${styles.empty} ml-8`}></div>
        </li>
      }
    </div>
  )
}

export default CartElement;
