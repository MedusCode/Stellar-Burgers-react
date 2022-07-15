import {FC, useRef, useState, useEffect, RefObject} from 'react';
import { useSelector } from 'react-redux';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsSection from '../ingredients-section/ingredients-section';

enum SectionName {
  bun = 'Булки',
  main = 'Начинки',
  sauce = 'Соусы',
}

const BurgerIngredients: FC = () => {
  const { bun, sauce, main } = useSelector((store:any) => ({bun: store.ingredients.bun, sauce: store.ingredients.sauce, main: store.ingredients.main}))
  const sectionListRef = useRef<HTMLUListElement>(null);
  const bunSectionRef = useRef<HTMLHeadingElement>(null);
  const sauceSectionRef = useRef<HTMLHeadingElement>(null);
  const mainSectionRef = useRef<HTMLHeadingElement>(null);
  const [current, setCurrent] = useState<SectionName>(SectionName.bun);

  const scrollSmoothly = (ref: RefObject<HTMLHeadingElement>) => {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  const handleSectionListScrolling = () => {
    const bunSectionRectTop = bunSectionRef.current?.getBoundingClientRect().top;
    const sauceSectionRectTop = sauceSectionRef.current?.getBoundingClientRect().top;
    const mainSectionRectTop = mainSectionRef.current?.getBoundingClientRect().top;
    
    if (sectionListRef.current && mainSectionRectTop && sauceSectionRectTop && bunSectionRectTop) {
      if (mainSectionRectTop <= sectionListRef.current.offsetTop) {
        setCurrent(SectionName.main)
      }
      else if (sauceSectionRectTop <= sectionListRef.current?.offsetTop) {
        setCurrent(SectionName.sauce)
      }
      else if (bunSectionRectTop <= sectionListRef.current?.offsetTop) {
        setCurrent(SectionName.bun)
      }
    }
  }

  useEffect(() => {
    const handleSectionListSizing = () => {
      if (sectionListRef.current) {
        sectionListRef.current.style.maxHeight = `${window.innerHeight - sectionListRef.current.offsetTop}px`;
      }
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
        <Tab value="bun" active={current === SectionName.bun} onClick={() => {
          setCurrent(SectionName.bun)
          scrollSmoothly(bunSectionRef);
          }}>{SectionName.bun}</Tab>
        <Tab value="sauce" active={current === SectionName.sauce} onClick={() => {
          setCurrent(SectionName.sauce)
          scrollSmoothly(sauceSectionRef);
          }}>{SectionName.sauce}</Tab>
        <Tab value="main" active={current === SectionName.main} onClick={() => {
          setCurrent(SectionName.main)
          scrollSmoothly(mainSectionRef);
          }}>{SectionName.main}</Tab>
      </div>
      <ul ref={sectionListRef} className={styles.sectionsList} onWheel={handleSectionListScrolling}>
        <li><IngredientsSection ref={bunSectionRef} title={SectionName.bun} ingredients={bun}/></li>
        <li><IngredientsSection ref={sauceSectionRef} title={SectionName.sauce} ingredients={sauce}/></li>
        <li><IngredientsSection ref={mainSectionRef} title={SectionName.main} ingredients={main}/></li>
      </ul>
    </section>
  )
}

export default BurgerIngredients;
