import React from 'react';
import { nanoid } from 'nanoid';
import styles from './compound.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Compound = ({ ingredientsList }) => {

  return (
    <ul className={styles.list}>
      {ingredientsList.map(ingredient => {
        return (
          <li className={`${styles.item} mr-8`} key={nanoid()}>
            <div className={styles.ingredientImageContainer}>
              <img 
                className={styles.ingredientImage} 
                src={ingredient.image} 
                key={nanoid()} 
              />
            </div>
            <span className='text text_type_main-default'>{ingredient.name}</span>
            <div className={styles.priceContainer}>
              <span className='text text_type_digits-default'>{`${ingredient.amount} x ${ingredient.price}`}</span>
              <CurrencyIcon />
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default Compound;