import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './request-status.module.css';
import useUserStatus from '../../services/hooks/useUserStatus.jsx';
import { RESET_USER_REQUEST_STATUS } from '../../services/actions/user';
import { CLOSE_MODAL } from '../../services/actions/modal';

const RequestStatus = () => {
  const dispatch = useDispatch();
  const { isAuthorized, request, requestFailed, errorStatus, requestSuccess} = useUserStatus();
  const requestType = useSelector(store => store.modal.requestType);
  const [ text, setText ] = React.useState('Секунду...')

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  }

  const handleEnter = e => {
    e.key === 'Enter' && closeModal();
  } 

  React.useEffect(() => {
    if (request) setText('Секунду...');
    else if (requestSuccess || !isAuthorized) closeModal();
    else if (requestFailed) {
      if (requestType === 'email' && errorStatus === 403) setText('Данный Логин занят другим пользователем');
      else setText('Ошибка при обработке запроса');
    }
  }, [isAuthorized, request, requestFailed, errorStatus, requestSuccess])

  React.useEffect(() => {
    document.addEventListener('keydown', handleEnter);

    return () => {
      document.removeEventListener('keydown', handleEnter);
    }
  }, [requestFailed])

  React.useEffect(() => {
    return () => {
      dispatch({ type: RESET_USER_REQUEST_STATUS });
    }
  }, [])

  return (
    <span className={`${styles.text} text text_type_main-medium mb-10`}>{text}</span>
  )
}

export default RequestStatus;