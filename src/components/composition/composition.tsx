import {FC} from 'react';
import { nanoid } from 'nanoid';
import styles from './composition.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IIngredient from '../../types/ingredient'

interface ICompoundProps {
  compositionIngredients: IIngredient[];
}

const Composition: FC<ICompoundProps> = ({ compositionIngredients }) => {

  return (
    <ul className={styles.list}>
      {compositionIngredients.map(ingredient => {
        return (
          <li className={styles.item} key={nanoid()}>
            <div className={styles.ingredientImageContainer}>
              <img 
                className={styles.ingredientImage} 
                src={ingredient.image} 
                key={nanoid()} 
              />
            </div>
            <span className='text text_type_main-default'>{ingredient.name}</span>
            <div className={styles.priceContainer}>
              <span className='text text_type_digits-default'>{`${ingredient.amount} x ${ingredient.price}`}</span>
              <CurrencyIcon type='primary' />
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default Composition;