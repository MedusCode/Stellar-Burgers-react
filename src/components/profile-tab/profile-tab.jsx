import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom'
import styles from './profile-tab.module.css';
import { logoutRequest } from '../../services/actions/user.jsx';
import { OPEN_MODAL } from '../../services/actions/modal';

const ProfileTab = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = () => {
    dispatch(logoutRequest());
    history.replace({ pathname: '/login' })
  }

  const openConfirmationModal = e => {
    e.preventDefault();
    dispatch({ 
      type: OPEN_MODAL, 
      modalType: 'confirmation', 
      confirmationType: 'logout', 
      handler: logout 
    });
  }

  return (
    <div className={styles.container}>
      <a className={`${styles.link} text text_type_main-medium text_color_inactive`}>Профиль</a>
      <a className={`${styles.link} text text_type_main-medium text_color_inactive`}>История Заказов</a>
      <button onClick={openConfirmationModal} className={`${styles.link} text text_type_main-medium text_color_inactive`}>Выход</button>
      <span className={`${styles.description} text text_type_main-default text_color_inactive mt-20`}>В этом разделе вы можете изменить свои персональные данные</span>
    </div>
  )
}

export default ProfileTab;