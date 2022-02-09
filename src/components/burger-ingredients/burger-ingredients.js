import React from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientsSection from '../ingredients-section/ingredients-section'

import ingr from '../aaa'

const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState('bun')
  const sectionListRef = React.useRef(null)
  const [ingredients, setIngredients] = React.useState({
    bun: [],
    sauce: [],
    main: []
  })

  React.useEffect(() => {
    function tryy() {
      setTimeout(() => {
        const bun = [];
        const sauce = [];
        const main = [];

        ingr.forEach((ingredient) => {
          ingredient.type === 'bun' && bun.push(ingredient)
          ingredient.type === 'sauce' && sauce.push(ingredient);
          ingredient.type === 'main' && main.push(ingredient);
        })

        setIngredients({bun, sauce, main});
      }, 100)
    }

    tryy()
  }, [])

  React.useEffect(() => {
    const sectionListSizing = () => {
      sectionListRef.current.style.maxHeight = `${window.innerHeight - sectionListRef.current.offsetTop - 40}px`;
    }

    window.addEventListener('resize', sectionListSizing);
    sectionListSizing()

    return () => {
      window.removeEventListener('resize', sectionListSizing);
    }
  }, [])

  return (
    <section className={styles.container}>
      <h1 className={`${styles.title} text text_type_main-large pt-10 mb-5`}>Соберите бургер</h1>
      <div className={`${styles.tabs} mb-10`}>
        <Tab value="bun" active={current === 'bun'}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'}>
          Начинки
        </Tab>
      </div>
      <ul ref={sectionListRef} className={styles.sectionsList}>
        <li><IngredientsSection title='Булки' ingredients={ingredients.bun}/></li>
        <li><IngredientsSection title='Соусы' ingredients={ingredients.sauce}/></li>
        <li><IngredientsSection title='Начинка' ingredients={ingredients.main}/></li>
      </ul>
    </section>
  )
}

export default BurgerIngredients;
