import {FC, useEffect} from 'react';
import styles from './constructor-card.module.css';
import { useDispatch } from 'react-redux';
import { useDrag, ConnectDropTarget, ConnectDragPreview } from "react-dnd";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { startMoveDragging, STOP_DRAGGING } from '../../services/actions/dragging';
import { changeConstructorIngredients } from '../../services/actions/burger-constructor';
import { removeFromConstructor } from '../../services/actions/burger-constructor';
import IIngredient from '../../types/ingredient';

interface IConstructorCardProps {
  ingredient: IIngredient;
  isOver: boolean;
}

const ConstructorCard: FC<IConstructorCardProps> = ({ ingredient, isOver }) => {
  const dispatch = useDispatch();
  const id = ingredient.nanoid

  const removeElement = (ingredient: IIngredient) => {
    dispatch(removeFromConstructor(ingredient));
  }

  const [{isDragging}, ingredientRef]: [{isDragging: boolean;}, ConnectDropTarget, ConnectDragPreview] = useDrag({
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

  useEffect(() => {
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

export default ConstructorCard;
