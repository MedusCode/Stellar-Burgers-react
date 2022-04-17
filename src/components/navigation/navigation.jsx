import React from 'react';
import { useSelector } from 'react-redux';
import styles from './navigation.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import NavigationButton from '../navigation-button/navigation-button';

const Navigation = () => {
  const activePage = useSelector(store => store.app.activePage)

  return (
    <nav className={styles.navigation}>
      <div className={styles.container}>
        <NavigationButton text='Конструктор' isActive={activePage === 'Constructor'}>
          <BurgerIcon type={activePage === 'Constructor' ? 'primary' : 'secondary'} />
        </NavigationButton>
        <NavigationButton text='Лента заказов' isActive={activePage === 'Order list'}>
          <ListIcon type={activePage === 'Order list' ? 'primary' : 'secondary'} />
        </NavigationButton>
      </div>
      <a href='#'><Logo /></a>
      <div className={styles.container}>
        <NavigationButton text='Личный кабинет' isActive={activePage === 'Profile'}>
          <ProfileIcon type={activePage === 'Profile' ? 'primary' : 'secondary'} />
        </NavigationButton>
      </div>
    </nav>
  )
}

export default Navigation;
