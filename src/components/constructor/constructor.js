import React from 'react';
import PropTypes from 'prop-types';
import ingredientType from '../../assets/scripts/propTypes';
import styles from './constructor.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

const Constructor = ({ filteredData, ingredientsData }) => {
  return (
    <section className={styles.constructorPage}>
      <BurgerIngredients filteredData={filteredData} />
      <BurgerConstructor ingredientsData={ingredientsData}/>
    </section>
  )
}

Constructor.propTypes = {
  filteredData: PropTypes.shape({
    bun: PropTypes.arrayOf(ingredientType).isRequired,
    sauce: PropTypes.arrayOf(ingredientType).isRequired,
    main: PropTypes.arrayOf(ingredientType).isRequired
  }).isRequired,
  ingredientsData: PropTypes.arrayOf(ingredientType).isRequired
}

export default Constructor;
