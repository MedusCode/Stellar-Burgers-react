import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag } from "react-dnd";
import { removeFromConstructor } from '../../services/actions/burger-constructor';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-card.module.css';
import ingredientType from '../../assets/scripts/propTypes'
import { startMoveDragging, STOP_DRAGGING } from '../../services/actions/dragging';
import { changeConstructorIngredients } from '../../services/actions/burger-constructor';

const ConstructorCard = ({ ingredient }) => {
  const dispatch = useDispatch();
  const constructorArray = useSelector(store => store.burgerConstructor.ingredients)
  const id = ingredient.nanoid
  const type = 'move'

  const removeElement = (ingredient) => {
    dispatch(removeFromConstructor(ingredient));
  }

  const [{isDragging}, ingredientRef] = useDrag({
    type: "ingredient",
    item: { id, type },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    end: (dropResult, monitor) => {
      const didDrop = monitor.didDrop();
      didDrop && dispatch(changeConstructorIngredients(false))
      dispatch({type: STOP_DRAGGING});
    }
  });

  React.useEffect(() => {
    if (isDragging) {
      dispatch(startMoveDragging(ingredient));
    }
  }, [isDragging])

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
