import React from 'react';
import styles from './navigation-button.module.css';

const NavigationButton = (props) => {
  const clickHandler = () => {
    console.log('hey')
    switch (props.text) {
      case 'Конструктор':
        props.setActivePage('Constructor');
        break;
      case 'Лента заказов':
        props.setActivePage('Order list');
        break;
      case 'Личный кабинет':
        props.setActivePage('Profile');
        break;
    }
  }

  return (
    <button className={`${props.isActive ? styles.buttonActive : styles.button} pt-4 pr-5 pb-4 pl-5`} onClick={clickHandler}>
      {props.children}
      <span className="text text_type_main-default ml-2">
        {props.text}
      </span>
    </button>
  )
}

export default NavigationButton;
