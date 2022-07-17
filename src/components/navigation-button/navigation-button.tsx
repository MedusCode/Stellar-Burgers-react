import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './navigation-button.module.css';

interface INavigationButtonProps {
  text: string;
  path: string;
}

const NavigationButton: FC<INavigationButtonProps> = ({ children, text, path }) => {
  return (
    <NavLink
      to={path}
      exact={path === '/' ? true : false}
      activeClassName={styles.activeLink}
      className={`${styles.link} text_color_inactive pt-4 pr-5 pb-4 pl-5`}
    >
      {children}
      <span className={'text text_type_main-default ml-2'}>
        {text}
      </span>
    </NavLink>
  )
}

export default NavigationButton;