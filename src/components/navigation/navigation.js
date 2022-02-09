import React from 'react';
import styles from './navigation.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import NavigationButton from '../navigation-button/navigation-button';

const Navigation = () => {
  const [activePage, setActivePage] = React.useState('Constructor');

  return (
    <nav className={styles.navigation}>
      <div className={styles.container}>
        <NavigationButton text='Конструктор' isActive={activePage === 'Constructor'} setActivePage={setActivePage}>
          <BurgerIcon type={activePage === 'Constructor' ? 'primary' : 'secondary'} />
        </NavigationButton>
        <NavigationButton text='Лента заказов' isActive={activePage === 'Order list'} setActivePage={setActivePage}>
          <ListIcon type={activePage === 'Order list' ? 'primary' : 'secondary'} />
        </NavigationButton>
      </div>
      <a href='#'><Logo /></a>
      <div className={styles.container}>
        <NavigationButton text='Личный кабинет' isActive={activePage === 'Profile'} setActivePage={setActivePage}>
          <ProfileIcon type={activePage === 'Profile' ? 'primary' : 'secondary'} />
        </NavigationButton>
      </div>
    </nav>
  )
}

export default Navigation;
