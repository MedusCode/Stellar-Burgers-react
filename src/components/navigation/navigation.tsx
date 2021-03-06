import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './navigation.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import NavigationButton from '../navigation-button/navigation-button';

const Navigation: FC = () => {
  return (
    <nav className={styles.navigation}>
      <div className={styles.container}>
        <NavigationButton text='Конструктор' path='/'>
          <BurgerIcon type='secondary' />
        </NavigationButton>
        <NavigationButton text='Лента заказов' path='/feed'>
          <ListIcon type='secondary' />
        </NavigationButton>
      </div>
      <Link to='/'><Logo /></Link>
      <div className={styles.container}>
        <NavigationButton text='Личный кабинет' path='/profile'>
          <ProfileIcon type='secondary' />
        </NavigationButton>
      </div>
    </nav>
  )
}

export default Navigation;
