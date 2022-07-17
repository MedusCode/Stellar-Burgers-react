import { FC } from 'react';
import styles from './info-page.module.css';

interface IInfoPageProps {
  info?: string;
}

const InfoPage: FC<IInfoPageProps> = ({ children, info }) => {
  
  return (
    <section className={styles.container}>
      <h1 className='text text_type_main-large mb-5'>{children}</h1>
      {info && <span className='text text_type_main-medium'>{info}</span>}
    </section>
  )
}

export default InfoPage;
