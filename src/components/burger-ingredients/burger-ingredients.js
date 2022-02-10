import React from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientsSection from '../ingredients-section/ingredients-section'

import ingr from '../aaa'

const BurgerIngredients = () => {
  const sectionListRef = React.useRef(null)
  const [current, setCurrent] = React.useState('bun')
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
      }, 1000)
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
        <a className={styles.link} href='#bun'>
          <Tab value="bun" active={current === 'bun'} onClick={() => setCurrent('bun')}>Булки</Tab>
        </a>
        <a className={styles.link} href='#sauce'>
        <Tab value="sauce" active={current === 'sauce'} onClick={() => setCurrent('sauce')}>Соусы</Tab>
        </a>
        <a className={styles.link} href='#main'>
          <Tab value="main" active={current === 'main'} onClick={() => setCurrent('main')}>Начинки</Tab>
        </a>
      </div>
      <ul ref={sectionListRef} className={styles.sectionsList}>
        <li><IngredientsSection id='bun' title='Булки' ingredients={ingredients.bun}/></li>
        <li><IngredientsSection id='sauce' title='Соусы' ingredients={ingredients.sauce}/></li>
        <li><IngredientsSection id='main' title='Начинка' ingredients={ingredients.main}/></li>
      </ul>
    </section>
  )
}

export default BurgerIngredients;
