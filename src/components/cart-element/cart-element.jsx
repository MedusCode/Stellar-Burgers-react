import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import styles from './cart-element.module.css';
import ConstructorCard from '../constructor-card/constructor-card';
import { useDrop } from "react-dnd";
import { CHANGE_DRAGGING_POSSITION } from '../../services/actions/dragging';

const CartElement = ({ item, index }) => {
  const dispatch = useDispatch();
  const {draggingIndex, draggingType} = useSelector(store => ({
    draggingIndex: store.dragging.index,
    draggingType: store.dragging.draggingType,
  }));

  const [{ isOver }, ingredientTarget] = useDrop({
    accept: "ingredient",
    collect: monitor => ({
      isOver: monitor.isOver(),
    })
  });

  React.useEffect(() => {
    isOver && draggingIndex !== index && dispatch({type: CHANGE_DRAGGING_POSSITION, index: index});
  }, [isOver])

  return (
    <div ref={ingredientTarget} className={index === draggingIndex ? isOver || draggingType === 'move' ? styles.dragging : styles.draggingg : ''}>
      { item
        ? <ConstructorCard ingredient={item} isHidden={index === draggingIndex} />
        : <li className={`${styles.ingredient} ml-4 mr-4 mt-2 mb-2`}>
            <div className={`${styles.empty} ml-8`}></div>
          </li>
      }
    </div>
  )
}

export default CartElement;
