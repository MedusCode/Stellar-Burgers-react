import { FC } from 'react';
import { useSelector } from '../../services/hooks/reduxHooks';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from './constructor.module.css';
import InfoPage from '../../components/info-page/info-page';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';

const Constructor: FC = () => {
  const { ingredientsFailed, errorCode } = useSelector(store => ({
    ingredientsFailed: store.ingredients.ingredientsFailed,
    errorCode: store.ingredients.errorCode
  }));

  if (ingredientsFailed) {
    return (
      <InfoPage info='Попробуйте перезапустить страницу.'>Произошла ошибка {errorCode ? `: ${errorCode}` : ''}</InfoPage>
    )
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <section className={styles.constructorPage}>
        <BurgerIngredients />
        <BurgerConstructor />
      </section>
    </DndProvider>
  )
}

export default Constructor;
