import {memo, forwardRef} from 'react';
import styles from './ingredients-section.module.css';
import IngredientCard from '../ingredient-card/ingredient-card';
import IIngredient from '../../types/ingredient';

interface IngredientsSectionProps {
  title: string;
  ingredients: IIngredient[]; 
}

const IngredientsSection = memo(forwardRef<HTMLHeadingElement, IngredientsSectionProps>(({title, ingredients}, ref) => {
  return (
    <section>
      <h2 ref={ref} className={`${styles.title} text text_type_main-medium mb-6`}>
        {title}
      </h2>
      <ul className={`${styles.container} pl-4 pr-4`}>
        {ingredients.map((ingredient) => <IngredientCard key={ingredient._id} ingredient={ingredient}/>)}
      </ul>
    </section>
  )
}))

export default IngredientsSection;
