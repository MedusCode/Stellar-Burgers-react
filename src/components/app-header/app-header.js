import React from 'react';
import PropTypes from 'prop-types';
import styles from './app-header.module.css';
import Navigation from '../navigation/navigation';

const AppHeader = (props) => {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <Navigation setActivePage={props.setActivePage} />
    </header>
  )
}

AppHeader.propTypes = {
  setActivePage: PropTypes.func.isRequired
}

export default AppHeader;
