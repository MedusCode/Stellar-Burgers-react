import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import styles from './ingredients.module.css'
import NotFound from '../not-found/not-found.jsx';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';

const Ingredients = () => {
  const params = useParams();
  const {bun, sauce, main} = useSelector(store => ({
    bun: store.ingredients.bun,
    sauce: store.ingredients.sauce,
    main: store.ingredients.main
  }))
  const [activeIngredient, setActiveIngredient] = React.useState({});
  const [isIngredientExist, setIsIngredientExist] = React.useState(true)

  React.useEffect(() => {
    const ingredient = [...bun, ...sauce, ...main].find(ingredient => ingredient._id === params.id); 
    if ([...bun, ...sauce, ...main].length > 0 && !ingredient) setIsIngredientExist(false)
    else setActiveIngredient(ingredient);
  }, [bun, sauce, main]);

  if (!isIngredientExist) return (
    <NotFound />
  )

  return (
    <div className={`${styles.container} pt-30`}>
      <IngredientDetails ingredient={activeIngredient} />
    </div>
  )
}

export default Ingredients;