import React from 'react';
import PropTypes from 'prop-types';
import ingredientType from '../../assets/scripts/propTypes';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientsSection from '../ingredients-section/ingredients-section'

const BurgerIngredients = ({ filteredData }) => {
  const sectionListRef = React.useRef(null);
  const bunSectionRef = React.useRef(null);
  const sauceSectionRef = React.useRef(null);
  const mainSectionRef = React.useRef(null);
  const [current, setCurrent] = React.useState('bun');

  const scrollSmoothly = (ref) => {
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

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
        <Tab value="bun" active={current === 'bun'} onClick={(e) => {
          setCurrent('bun');
          scrollSmoothly(bunSectionRef);
          }}>Булки</Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={(e) => {
          setCurrent('sauce');
          scrollSmoothly(sauceSectionRef);
          }}>Соусы</Tab>
        <Tab value="main" active={current === 'main'} onClick={(e) => {
          setCurrent('main');
          scrollSmoothly(mainSectionRef);
          }}>Начинки</Tab>
      </div>
      <ul ref={sectionListRef} className={styles.sectionsList}>
        <li><IngredientsSection ref={bunSectionRef} title='Булки' ingredients={filteredData.bun}/></li>
        <li><IngredientsSection ref={sauceSectionRef} title='Соусы' ingredients={filteredData.sauce}/></li>
        <li><IngredientsSection ref={mainSectionRef} title='Начинка' ingredients={filteredData.main}/></li>
      </ul>
    </section>
  )
}

BurgerIngredients.propTypes = {
  filteredData: PropTypes.shape({
    bun: PropTypes.arrayOf(ingredientType).isRequired,
    sauce: PropTypes.arrayOf(ingredientType).isRequired,
    main: PropTypes.arrayOf(ingredientType).isRequired
  }).isRequired
}

export default BurgerIngredients;
