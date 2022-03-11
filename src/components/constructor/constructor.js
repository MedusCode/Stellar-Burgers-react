import React from 'react';
import { useSelector } from 'react-redux';
import InfoPage from '../info-page/info-page';
import PropTypes from 'prop-types';
import ingredientType from '../../assets/scripts/propTypes';
import styles from './constructor.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

const Constructor = () => {
  const { ingredientsRequest, ingredientsFailed, errorCode } = useSelector(store => ({
    ingredientsRequest: store.ingredients.ingredientsRequest,
    ingredientsFailed: store.ingredients.ingredientsFailed,
    errorCode: store.ingredients.errorCode
  }));

  return (
    <>
      {!ingredientsRequest && !ingredientsFailed ?
        <section className={styles.constructorPage}>
          <BurgerIngredients />
          <BurgerConstructor />
        </section>
        : ingredientsRequest
          ? <InfoPage>Загрузка...</InfoPage>
          : <InfoPage info='Попробуйте перезапустить страницу.'>Произошла ошибка: {errorCode}</InfoPage>
      }
    </>
  )
}

export default Constructor;
