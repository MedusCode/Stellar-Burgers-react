import React from 'react';
import { useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from './constructor.module.css';
import InfoPage from '../../components/info-page/info-page';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';

const Constructor = () => {
  const { ingredientsRequest, ingredientsFailed, errorCode } = useSelector(store => ({
    ingredientsRequest: store.ingredients.ingredientsRequest,
    ingredientsFailed: store.ingredients.ingredientsFailed,
    errorCode: store.ingredients.errorCode
  }));

  return (
    <>
      {!ingredientsRequest && !ingredientsFailed ?
        <DndProvider backend={HTML5Backend}>
          <section className={styles.constructorPage}>
            <BurgerIngredients />
            <BurgerConstructor />
          </section>
        </DndProvider>
        : ingredientsRequest
          ? <InfoPage>Загрузка...</InfoPage>
          : <InfoPage info='Попробуйте перезапустить страницу.'>Произошла ошибка: {errorCode}</InfoPage>
      }
    </>
  )
}

export default Constructor;
