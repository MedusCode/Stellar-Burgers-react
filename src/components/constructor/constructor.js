import React from 'react';
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

export default Constructor;
