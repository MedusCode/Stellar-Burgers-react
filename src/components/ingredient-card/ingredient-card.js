import React from 'react';
import { useDispatch } from 'react-redux';
import ingredientType from '../../assets/scripts/propTypes';
import styles from './ingredient-card.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { OPEN_MODAL } from '../../services/actions/modal';
import { addToConstructor } from '../../services/actions/burger-constructor';

const IngredientCard = ({ ingredient }) => {
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch({type: OPEN_MODAL, ingredient: ingredient })
  }

  const addIng = () => {
    dispatch(addToConstructor(ingredient))
  }

  return (
    <>
      <li className={styles.card} onClick={addIng}>
        <img className={`${styles.image} mb-2 pl-4 pr-4`} src={ingredient.image} alt={ingredient.name} />
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
