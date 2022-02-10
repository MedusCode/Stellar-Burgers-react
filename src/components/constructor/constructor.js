import React from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'

const Constructor = () => {
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
    <BurgerIngredients />
  )
}

export default Constructor;
