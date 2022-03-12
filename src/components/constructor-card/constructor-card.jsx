import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag } from "react-dnd";
import { removeFromConstructor, NEW_CONSTRUCTOR_ORDER } from '../../services/actions/burger-constructor';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-card.module.css';
import ingredientType from '../../assets/scripts/propTypes'
import { START_DRAGGING } from '../../services/actions/dragging';

const ConstructorCard = ({ ingredient }) => {
  const dispatch = useDispatch();
  const constructorArray = useSelector(store => store.burgerConstructor.ingredients)
  const id = ingredient.nanoid
  const type = 'move'

  const removeElement = (ingredient) => {
    dispatch(removeFromConstructor(ingredient));
  }

  const [{endDrag, didDrop, isDragging}, ingredientRef] = useDrag({
    type: "ingredient",
    item: { id, type },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  React.useEffect(() => {
    if (isDragging) {
      const newArray = [...constructorArray].filter(item => item.nanoid !== ingredient.nanoid)
      dispatch({
        type: START_DRAGGING,
        ingredient: {...ingredient},
        constructorArray: newArray,
      });
      dispatch(removeFromConstructor(ingredient));
    }
  }, [isDragging, endDrag, didDrop])

  return (
    <>
      { !isDragging &&
        <li className={`${styles.ingredient} ml-4 mr-4`} key={ingredient.nanoid} ref={ingredientRef}>
          <DragIcon type="primary"/>
          <ConstructorElement
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image}
          handleClose={() => {removeElement(ingredient)}}
          />
        </li>
      }
    </>
  )
}

ConstructorCard.propTypes = {
  ingredient: ingredientType.isRequired
}

export default ConstructorCard;
