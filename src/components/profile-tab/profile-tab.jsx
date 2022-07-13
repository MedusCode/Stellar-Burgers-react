import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useRouteMatch, useLocation } from 'react-router-dom'
import styles from './profile-tab.module.css';
import { logoutRequest } from '../../services/actions/user.jsx';
import { OPEN_MODAL } from '../../services/actions/modal';

const ProfileTab = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const logoutButtonRef = React.useRef(null)
  const { path } = useRouteMatch();
  const confirmationType = useSelector(store => store.modal.confirmationType)

  const logout = () => {
    dispatch(logoutRequest());
  }

  const openConfirmationModal = e => {
    e.preventDefault();
    logoutButtonRef.current.blur();
    dispatch({ 
      type: OPEN_MODAL, 
      modalType: 'confirmation',
      text: 'Вы уверены, что хотите выйти?',
      confirmationType: 'logout', 
      handler: logout 
    });
  }

  return (
    <div className={`${styles.container} mt-20`}>
      <NavLink 
        to={path} 
        exact 
        className={`${styles.link} text text_type_main-medium text_color_inactive`} 
        activeClassName={confirmationType !== 'logout' ? styles.activeLink : ''}
      >
        Профиль
      </NavLink>
      <NavLink 
        to={`${path}/orders`} 
        exact 
        className={`${styles.link} text text_type_main-medium text_color_inactive`} 
        activeClassName={confirmationType !== 'logout' ? styles.activeLink : ''}
      >
        История Заказов
      </NavLink>
      <button 
        onClick={openConfirmationModal} 
        ref={logoutButtonRef}
        className={`${styles.link} ${confirmationType === 'logout' ? styles.activeButton : ''} text text_type_main-medium text_color_inactive`}
      >
        Выход
      </button>
      <span className={`${styles.description} text text_type_main-default text_color_inactive mt-20`}>
        {location.pathname === '/profile' 
          ? 'В этом разделе вы можете изменить свои персональные данные'
          : 'В этом разделе вы можете просмотреть свою историю заказов'
        }
      </span>
    </div>
  )
}

export default ProfileTab;