import React from 'react';
import styles from './ingredient-card.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'

const IngredientCard = ({ ingredient, count }) => {
  return (
    <li className={styles.card}>
      <img className={`${styles.image} mb-2 pl-4 pr-4`} src={ingredient.image} alt={ingredient.name} />
      <div className={`${styles.priceContainer} mb-2`}>
        <span className='text text_type_digits-default mr-2'>{ingredient.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <span className={`${styles.text} text text_type_main-default`}>{ingredient.name}</span>
      {count && <Counter count={1} size={count < 10 ? 'default' : 'small'} />}
    </li>
  )
}

export default IngredientCard;
