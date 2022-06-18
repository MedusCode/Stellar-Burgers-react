import React from 'react';
import { nanoid } from 'nanoid';
import { ingredient as ingredientType } from '../../assets/scripts/propTypes';
import PropTypes from "prop-types";
import styles from './compound.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Compound = ({ ingredientsList }) => {

  return (
    <ul className={styles.list}>
      {ingredientsList.map(ingredient => {
        return (
          <li className={styles.item} key={nanoid()}>
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

Compound.propTypes = {
  ingredientsList: PropTypes.arrayOf(ingredientType).isRequired,
}

export default Compound;