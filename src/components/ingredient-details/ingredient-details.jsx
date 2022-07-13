import React from 'react';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';
import styles from './ingredient-details.module.css';

const IngredientDetails = (props) => {
  const { isModalOpened, modalIngredient } = useSelector(store => ({
    isModalOpened: store.modal.isOpen,
    modalIngredient: store.modal.currentIngredient
  }))
  const ingredient = props.ingredient ? props.ingredient : modalIngredient;

  return (
    <div className={styles.container}>
      <h2 className={`${styles.title} ${isModalOpened ? styles.titleLeft : ''} text text_type_main-large`}>Детали ингредиента</h2>
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
  ingredient: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number,
  })
}

export default IngredientDetails;
