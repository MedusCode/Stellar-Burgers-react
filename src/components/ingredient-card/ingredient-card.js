import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from "react-dnd";
import ingredientType from '../../assets/scripts/propTypes';
import styles from './ingredient-card.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { OPEN_MODAL } from '../../services/actions/modal';
import { START_DRAGGING } from '../../services/actions/dragging';

const IngredientCard = ({ ingredient }) => {
  const dispatch = useDispatch();
  const constructorArray = useSelector(store => store.burgerConstructor.ingredients)
  const id = ingredient._id;

  const openModal = () => {
    dispatch({type: OPEN_MODAL, ingredient: ingredient })
  }

  const [{isDragging}, ingredientRef] = useDrag({
    type: "ingredient",
    item: { id },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    })
  });

  const [, bunRef] = useDrag({
    type: "bun",
    item: { id },
  });

  React.useEffect(() => {
    isDragging && dispatch({type: START_DRAGGING, ingredient: ingredient, constructorArray: constructorArray});
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
