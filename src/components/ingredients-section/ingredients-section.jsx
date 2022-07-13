import React from 'react';
import PropTypes from 'prop-types';
import { ingredient as ingredientType } from '../../assets/scripts/propTypes';
import styles from './ingredients-section.module.css';
import IngredientCard from '../ingredient-card/ingredient-card';

const IngredientsSection = React.memo(React.forwardRef((props, ref) => {
  return (
    <section>
      <h2 ref={ref} className={`${styles.title} text text_type_main-medium mb-6`}>
        {props.title}
      </h2>
      <ul className={`${styles.container} pl-4 pr-4`}>
        {props.ingredients.map((ingredient) => <IngredientCard key={ingredient._id} ingredient={ingredient}/>)}
      </ul>
    </section>
  )
}))

IngredientsSection.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientType).isRequired,
  title: PropTypes.string.isRequired
}

export default IngredientsSection;
