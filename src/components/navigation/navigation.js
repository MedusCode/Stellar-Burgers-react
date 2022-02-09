import React, { useEffect } from 'react';
import styles from './navigation.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import NavigationButton from '../navigation-button/navigation-button';

const Navigation = (props) => {
  const [activeButton, setActiveButton] = React.useState('Constructor');

  React.useEffect(() => {
    props.setActivePage(activeButton);
  }, [activeButton])

  return (
    <nav className={styles.navigation}>
      <div className={styles.container}>
        <NavigationButton text='Конструктор' isActive={activeButton === 'Constructor'} setActiveButton={setActiveButton}>
          <BurgerIcon type={activeButton === 'Constructor' ? 'primary' : 'secondary'} />
        </NavigationButton>
        <NavigationButton text='Лента заказов' isActive={activeButton === 'Order list'} setActiveButton={setActiveButton}>
          <ListIcon type={activeButton === 'Order list' ? 'primary' : 'secondary'} />
        </NavigationButton>
      </div>
      <a href='#'><Logo /></a>
      <div className={styles.container}>
        <NavigationButton text='Личный кабинет' isActive={activeButton === 'Profile'} setActiveButton={setActiveButton}>
          <ProfileIcon type={activeButton === 'Profile' ? 'primary' : 'secondary'} />
        </NavigationButton>
      </div>
    </nav>
  )
}

export default Navigation;
