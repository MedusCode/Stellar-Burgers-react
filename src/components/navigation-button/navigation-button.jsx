import React from 'react';
import PropTypes from 'prop-types';
import styles from './navigation-button.module.css';

const NavigationButton = (props) => {
  const clickHandler = () => {
    switch (props.text) {
      case 'Конструктор':
        props.setActiveButton('Constructor');
        break;
      case 'Лента заказов':
        props.setActiveButton('Order list');
        break;
      case 'Личный кабинет':
        props.setActiveButton('Profile');
        break;
    }
  }

  return (
    <button className={`${styles.button} pt-4 pr-5 pb-4 pl-5`} onClick={clickHandler}>
      {props.children}
      <span className={`${!props.isActive && 'text_color_inactive'} text text_type_main-default ml-2`}>
        {props.text}
      </span>
    </button>
  )
}

NavigationButton.propTypes = {
  children: PropTypes.element,
  isActive: PropTypes.bool.isRequired,
  setActiveButton: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
}

export default NavigationButton;
