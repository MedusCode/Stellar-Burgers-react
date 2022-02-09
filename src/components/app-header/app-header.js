import React from 'react';
import styles from './app-header.module.css';
import Navigation from '../navigation/navigation';

const AppHeader = (props) => {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <Navigation setActivePage={props.setActivePage} />
    </header>
  )
}

export default AppHeader;
