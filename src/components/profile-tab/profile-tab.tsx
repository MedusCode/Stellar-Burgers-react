import { FC, useRef, MouseEvent } from 'react';
import { useSelector, useDispatch } from '../../services/hooks/reduxHooks';
import { NavLink, useRouteMatch, useLocation } from 'react-router-dom';
import styles from './profile-tab.module.css';
import { logoutRequest } from '../../services/actions/user';
import { OPEN_MODAL } from '../../services/actions/modal';
import ILocation from '../../types/location';

interface IRouteMatch {
  path: string;
}

const ProfileTab: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation<ILocation>();
  const logoutButtonRef = useRef<HTMLButtonElement>(null)
  const { path } = useRouteMatch<IRouteMatch>();
  const modalType = useSelector(store => store.modal.modalType);
  const isConfirmationModal = modalType === 'confirmation';

  const logout = () => {
    dispatch(logoutRequest());
  }

  const openConfirmationModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (logoutButtonRef.current) {
      logoutButtonRef.current.blur();
      dispatch({ 
        type: OPEN_MODAL, 
        modalType: 'confirmation',
        text: 'Вы уверены, что хотите выйти?',
        handler: logout 
      });
    }
  }

  return (
    <div className={`${styles.container} mt-20`}>
      <NavLink 
        to={path} 
        exact 
        className={`${styles.link} text text_type_main-medium text_color_inactive`} 
        activeClassName={!isConfirmationModal ? styles.activeLink : ''}
      >
        Профиль
      </NavLink>
      <NavLink 
        to={`${path}/orders`} 
        exact 
        className={`${styles.link} text text_type_main-medium text_color_inactive`} 
        activeClassName={!isConfirmationModal ? styles.activeLink : ''}
      >
        История Заказов
      </NavLink>
      <button 
        onClick={openConfirmationModal} 
        ref={logoutButtonRef}
        className={`${styles.link} ${isConfirmationModal ? styles.activeButton : ''} text text_type_main-medium text_color_inactive`}
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