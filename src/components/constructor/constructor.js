import React from 'react';
import styles from './constructor.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

const Constructor = ({ filteredData, ingredientsData }) => {
  React.useEffect(() => {
    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    for (let smoothLink of smoothLinks) {
        smoothLink.addEventListener('click', function (e) {
            e.preventDefault();
            const id = smoothLink.getAttribute('href');

            document.querySelector(id).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    };
  }, [])

  return (
    <section className={styles.constructorPage}>
      <BurgerIngredients filteredData={filteredData} />
      <BurgerConstructor ingredientsData={ingredientsData}/>
    </section>
  )
}

export default Constructor;
