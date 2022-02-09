import React from 'react';
import styles from './app-header.module.css';
import Navigation from '../navigation/navigation';

const AppHeader = () => {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <Navigation />
    </header>
  )
}

export default AppHeader;
