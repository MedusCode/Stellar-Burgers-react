import React from 'react';
import styles from './constructor-card.module.css';
import PropTypes from "prop-types";
import { ingredient as ingredientType } from '../../assets/scripts/propTypes'
import { useDispatch } from 'react-redux';
import { useDrag } from "react-dnd";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { startMoveDragging, STOP_DRAGGING } from '../../services/actions/dragging';
import { changeConstructorIngredients } from '../../services/actions/burger-constructor';
import { removeFromConstructor } from '../../services/actions/burger-constructor';

const ConstructorCard = ({ ingredient, isOver }) => {
  const dispatch = useDispatch();
  const id = ingredient.nanoid

  const removeElement = (ingredient) => {
    dispatch(removeFromConstructor(ingredient));
  }

  const [{isDragging}, ingredientRef] = useDrag({
    type: "ingredient",
    item: { id },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    end: () => {
      dispatch(changeConstructorIngredients(false))
      dispatch({type: STOP_DRAGGING});
    }
  });

  React.useEffect(() => {
    isDragging && dispatch(startMoveDragging(ingredient));
  }, [isDragging])

  return (
    <li className={`${styles.ingredient} ${isOver ? styles.over : ''} pl-4 mr-4 mb-2 mt-2`} ref={ingredientRef}>
      <DragIcon type="primary"/>
      <ConstructorElement
      text={ingredient.name}
      price={ingredient.price}
      thumbnail={ingredient.image}
      handleClose={() => {removeElement(ingredient)}}
      />
    </li>
  )
}

ConstructorCard.propTypes = {
  ingredient: ingredientType.isRequired,
  isOver: PropTypes.bool.isRequired,
}

export default ConstructorCard;
