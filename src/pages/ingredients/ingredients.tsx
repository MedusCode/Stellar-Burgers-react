import { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import styles from './ingredients.module.css'
import NotFound from '../not-found/not-found';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import IIngredient from '../../types/ingredient';

interface IIngredientsParams {
  id: string;
}

const Ingredients: FC = () => {
  const params = useParams<IIngredientsParams>();
  const {bun, sauce, main} = useSelector((store: any) => ({
    bun: store.ingredients.bun,
    sauce: store.ingredients.sauce,
    main: store.ingredients.main
  }))
  const [activeIngredient, setActiveIngredient] = useState<IIngredient | null>(null);

  useEffect(() => {
    const ingredient: IIngredient = [...bun, ...sauce, ...main].find(ingredient => ingredient._id === params.id); 
    ingredient && setActiveIngredient(ingredient);
  }, [bun, sauce, main]);

  if (!activeIngredient) return (
    <NotFound />
  )

  return (
    <div className={`${styles.container} pt-30`}>
      <IngredientDetails ingredient={activeIngredient} />
    </div>
  )
}

export default Ingredients;