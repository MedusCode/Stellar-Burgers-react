import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './navigation-button.module.css';

const NavigationButton = ({ children, text, path }) => {
  return (
    <NavLink
      to={path}
      exact={path === '/' ? true : false}
      activeClassName={styles.activeLink}
      className={`${styles.link} text_color_inactive pt-4 pr-5 pb-4 pl-5`}
    >
      {children}
      <span className={'text text_type_main-default ml-2'}>
        {text}
      </span>
    </NavLink>
  )
}

NavigationButton.propTypes = {
  children: PropTypes.element,
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
}

export default NavigationButton;