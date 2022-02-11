import React from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientsSection from '../ingredients-section/ingredients-section'

const BurgerIngredients = ({ filteredData }) => {
  const sectionListRef = React.useRef(null)
  const tabRef = React.useRef(null)
  const [current, setCurrent] = React.useState('bun')

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

  React.useEffect(() => {
    const smoothLinks = tabRef.current.querySelectorAll('a[href^="#"]');

    for (let smoothLink of smoothLinks) {
        smoothLink.addEventListener('click', function (e) {
            e.preventDefault();
            const id = smoothLink.getAttribute('href');

            sectionListRef.current.querySelector(id).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    };
  }, [])

  return (
    <section className={styles.container}>
      <h1 className={`${styles.title} text text_type_main-large pt-10 mb-5`}>Соберите бургер</h1>
      <div ref={tabRef} className={`${styles.tabs} mb-10`}>
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
        <li><IngredientsSection id='bun' title='Булки' ingredients={filteredData.bun}/></li>
        <li><IngredientsSection id='sauce' title='Соусы' ingredients={filteredData.sauce}/></li>
        <li><IngredientsSection id='main' title='Начинка' ingredients={filteredData.main}/></li>
      </ul>
    </section>
  )
}

export default BurgerIngredients;
