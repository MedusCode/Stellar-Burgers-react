import React from 'react';
import styles from './loading-page.module.css';

const LoadingPage = () => {
  return (
    <main className={styles.container}>
        <h1 className='text text_type_main-large mb-5'>Загрузка...</h1>
    </main>
  )
}

export default LoadingPage;
