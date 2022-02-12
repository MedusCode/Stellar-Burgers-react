import React from 'react';
import styles from './other-page.module.css'

const OtherPage = () => {
  return (
    <section className={styles.otherPage}>
        <h1 className='text text_type_main-large mb-5'>Здесь пока ничего нет :(</h1>
        <span className='text text_type_main-medium'>Дождитесь новой версии приложения</span>
    </section>
  )
}

export default OtherPage;
