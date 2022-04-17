import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './navigation-button.module.css';
import { SWITCH_PAGE } from '../../services/actions/app'

const NavigationButton = (props) => {
  const dispatch = useDispatch();
  const clickHandler = () => {
    switch (props.text) {
      case 'Конструктор':
        dispatch({type: SWITCH_PAGE, activePage: 'Constructor'})
        break;
      case 'Лента заказов':
        dispatch({type: SWITCH_PAGE, activePage: 'Order list'})
        break;
      case 'Личный кабинет':
        dispatch({type: SWITCH_PAGE, activePage: 'Profile'})
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
  text: PropTypes.string.isRequired
}

export default NavigationButton;
