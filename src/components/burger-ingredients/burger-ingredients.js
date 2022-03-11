import React from 'react';
import { useSelector } from 'react-redux';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsSection from '../ingredients-section/ingredients-section';

const BurgerIngredients = () => {
  const { bun, sauce, main } = useSelector(store => ({bun: store.ingredients.bun, sauce: store.ingredients.sauce, main: store.ingredients.main}))
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

  const handleSectionListScrolling = () => {
    const bunSectionRectTop = bunSectionRef.current.getBoundingClientRect().top;
    const sauceSectionRectTop = sauceSectionRef.current.getBoundingClientRect().top;
    const mainSectionRectTop = mainSectionRef.current.getBoundingClientRect().top;

    if (mainSectionRectTop <= sectionListRef.current.offsetTop) {
      setCurrent('main')
    }
    else if (sauceSectionRectTop <= sectionListRef.current.offsetTop) {
      setCurrent('sauce')
    }
    else if (bunSectionRectTop <= sectionListRef.current.offsetTop) {
      setCurrent('bun')
    }
  }

  React.useEffect(() => {
    const handleSectionListSizing = () => {
      sectionListRef.current.style.maxHeight = `${window.innerHeight - sectionListRef.current.offsetTop - 40}px`;
    }

    window.addEventListener('resize', handleSectionListSizing);
    handleSectionListSizing()

    return () => {
      window.removeEventListener('resize', handleSectionListSizing);
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
      <ul ref={sectionListRef} className={styles.sectionsList} onWheel={handleSectionListScrolling}>
        <li><IngredientsSection ref={bunSectionRef} title='Булки' ingredients={bun}/></li>
        <li><IngredientsSection ref={sauceSectionRef} title='Соусы' ingredients={sauce}/></li>
        <li><IngredientsSection ref={mainSectionRef} title='Начинка' ingredients={main}/></li>
      </ul>
    </section>
  )
}

export default BurgerIngredients;
