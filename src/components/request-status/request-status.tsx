import { FC, useState, useEffect } from 'react';
import { useDispatch } from '../../services/hooks/reduxHooks';
import styles from './request-status.module.css';
import useUserStatus from '../../services/hooks/useUserStatus';
import { RESET_USER_REQUEST_STATUS } from '../../services/actions/user';
import { CLOSE_MODAL } from '../../services/actions/modal';
import rocket from '../../assets/images/rocket.gif';

const RequestStatus: FC = () => {
  const dispatch = useDispatch();
  const { isAuthorized, request, requestFailed, errorMessage, requestSuccess} = useUserStatus();
  const [ text, setText ] = useState<string>('Секунду...')

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  }

  const handleEnter = (e: KeyboardEvent) => {
    e.key === 'Enter' && closeModal();
  } 

  useEffect(() => {
    if (request) setText('Секунду...');
    else if (requestSuccess || !isAuthorized) closeModal();
    else if (requestFailed) {
      if (errorMessage === 'User with such email already exists') setText('Данный Логин занят другим пользователем');
      else setText('Ошибка при обработке запроса');
    }
  }, [isAuthorized, request, requestFailed, errorMessage, requestSuccess])

  useEffect(() => {
    document.addEventListener('keydown', handleEnter);

    return () => {
      document.removeEventListener('keydown', handleEnter);
    }
  }, [requestFailed])

  useEffect(() => {
    return () => {
      dispatch({ type: RESET_USER_REQUEST_STATUS });
    }
  }, [])

  if (request) return (
    <div className={styles.rocketContainer}>
      <img className={styles.rocket} src={rocket}></img>
    </div>
  )

  return (
    <span className={`${styles.text} text text_type_main-medium mb-10`}>{text}</span>
  )
}

export default RequestStatus;