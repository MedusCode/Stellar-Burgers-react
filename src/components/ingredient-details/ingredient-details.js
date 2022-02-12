import React from 'react';
import ingredientType from '../../assets/scripts/propTypes';
import styles from './ingredient-details.module.css';

const IngredientDetails = ({ ingredient }) => {
  return (
    <div className={styles.container}>
      <img className={`${styles.image} mb-4`} src={ingredient.image_large} alt={ingredient.name} />
      <h3 className='text text_type_main-medium mb-8'>{ingredient.name}</h3>
      <div className={styles.infoContainer}>
        <div className={`${styles.info} mr-5`}>
          <span className='text text_type_main-default text_color_inactive mb-2'>Калории,ккал</span>
          <span className='text text_type_digits-default'>{ingredient.calories}</span>
        </div>
        <div className={`${styles.info} mr-5`}>
          <span className='text text_type_main-default text_color_inactive mb-2'>Белки, г</span>
          <span className='text text_type_digits-default'>{ingredient.proteins}</span>
        </div>
        <div className={`${styles.info} mr-5`}>
          <span className='text text_type_main-default text_color_inactive mb-2'>Жиры, г</span>
          <span className='text text_type_digits-default'>{ingredient.fat}</span>
        </div>
        <div className={styles.info}>
          <span className='text text_type_main-default text_color_inactive mb-2'>Углеводы, г</span>
          <span className='text text_type_digits-default'>{ingredient.carbohydrates}</span>
        </div>
      </div>
    </div>
  )
}

IngredientDetails.propTypes = {
  ingredient: ingredientType.isRequired
}

export default IngredientDetails;
