import React from 'react';
import styles from './ingredient-card.module.css';
import { ingredient as ingredientType } from '../../assets/scripts/propTypes';
import { useDispatch } from 'react-redux';
import { useDrag } from "react-dnd";
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { OPEN_MODAL } from '../../services/actions/modal';
import { startAddDragging, STOP_DRAGGING } from '../../services/actions/dragging';
import { changeConstructorIngredients } from '../../services/actions/burger-constructor';

const IngredientCard = ({ ingredient }) => {
  const dispatch = useDispatch();
  const id = ingredient._id;

  const openModal = () => {
    window.history.replaceState(null, ingredient.name, `/ingredients/${ingredient._id}`)
    dispatch({type: OPEN_MODAL, ingredient: ingredient, modalType: 'ingredient'})
  }

  const [{isDragging}, ingredientRef] = useDrag({
    type: "ingredient",
    item: { id },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    end: (dropResult, monitor) => {
      const didDrop = monitor.didDrop();
      didDrop && dispatch(changeConstructorIngredients(true));
      dispatch({type: STOP_DRAGGING});
    }
  });

  const [, bunRef] = useDrag({
    type: "bun",
    item: { id },
  });

  React.useEffect(() => {
    isDragging && dispatch(startAddDragging(ingredient));
  }, [isDragging])

  return (
    <>
      <li className={styles.card} onClick={openModal}>
        <img
        className={`${styles.image} mb-2 pl-4 pr-4`}
        src={ingredient.image}
        alt={ingredient.name}
        ref={ingredient.type === 'bun' ? bunRef : ingredientRef}/>
        <div className={`${styles.priceContainer} mb-2`}>
          <span className='text text_type_digits-default mr-2'>{ingredient.price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <span className={`${styles.text} text text_type_main-default`}>{ingredient.name}</span>
        {ingredient.__v > 0 && <Counter count={ingredient.__v} size={ingredient.__v < 10 ? 'default' : 'small'} />}
      </li>
    </>
  )
}

IngredientCard.propTypes = {
  ingredient: ingredientType.isRequired
}

export default IngredientCard;
