import { FC } from 'react';
import styles from './not-found.module.css';

const NotFound: FC = () => {
  return (
    <div className={styles.container}>
      <h1 className='text text_type_digits-large'>404</h1>
      <h2 className='text text_type_main-large'>Упс... Похоже, такой страницы не существует</h2>
    </div>
  )
}

export default NotFound;