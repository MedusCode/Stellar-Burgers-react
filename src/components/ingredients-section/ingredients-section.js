import React from 'react';
import PropTypes from 'prop-types';
import ingredientType from '../../assets/scripts/propTypes';
import styles from './ingredients-section.module.css';
import IngredientCard from '../ingredient-card/ingredient-card';

const IngredientsSection = React.memo((props) => {
  return (
    <section>
      <h2 id={props.id} className={`${styles.title} text text_type_main-medium mb-6`}>
        {props.title}
      </h2>
      <ul className={`${styles.container} pl-4 pr-4`}>
        {props.ingredients.map((ingredient, index) => <IngredientCard key={index} ingredient={ingredient}/>)}
      </ul>
    </section>
  )
})

IngredientsSection.propTypes = {
  id: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredientType).isRequired,
  title: PropTypes.string.isRequired
}

export default IngredientsSection;
