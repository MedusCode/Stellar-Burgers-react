import React from 'react';
import PropTypes from "prop-types";
import { useSelector, useDispatch } from 'react-redux';
import useUserStatus from '../../services/hooks/useUserStatus.jsx';
import styles from './confirmation.module.css'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { RESET_USER_REQUEST_STATUS } from '../../services/actions/user.jsx';

const Confirmation = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { isAuthorized, request, requestFailed, errorStatus, requestSuccess, isRequested } = useUserStatus();
  const { confirmationType, newValue, handleRequest } = useSelector(store => ({
    confirmationType: store.modal.confirmationType,
    newValue: store.modal.newValue,
    handleRequest: store.modal.handler
  }));
  const text = () => {switch (confirmationType) {
    case 'email': return 'Поменять логин на'
    case 'name': return 'Поменять имя на'
    case 'password': return 'Вы уверены, что хотите поменять Пароль?'
    case 'logout': return 'Вы уверены, что хотите Выйти?'
  }}
  const [ confirmationText, setConfirmationText ] = React.useState(text);

  const handleYes = () => {
    handleRequest();
  }

  const handleEnter = e => {
    if (e.key === 'Enter') {
      !isRequested && handleYes();
      requestFailed && closeModal();
    }
  }

  React.useEffect(() => {
    if (request) setConfirmationText('Одну секундочку...');
    else if (requestSuccess || !isAuthorized) closeModal();
    else if (requestFailed) {
      if (confirmationType === 'email' && errorStatus === 403) setConfirmationText('Данный Логин занят другим пользователем');
      else setConfirmationText('Ошибка при обработке запроса');
    }
    else setConfirmationText(text);
  }, [isAuthorized, request, requestFailed, errorStatus, requestSuccess])

  React.useEffect(() => {
    document.addEventListener('keydown', handleEnter);

    return () => {
      document.removeEventListener('keydown', handleEnter);
    }
  }, [isRequested, requestFailed])

  React.useEffect(() => {
    dispatch({ type: RESET_USER_REQUEST_STATUS });

    return () => {
      dispatch({ type: RESET_USER_REQUEST_STATUS });
    }
  }, [])

  return (
    <div className={styles.container} >
      <span className={`${styles.text} ${isRequested && 'mb-10'} text text_type_main-medium`}>
        {confirmationText}{!isRequested && newValue && <><br /><span className={styles.value}>{newValue}</span> ?</>}
      </span>
      {!isRequested &&
        <div className={styles.buttonsContainer}>
          <Button type="secondary" size="large" onClick={closeModal}>Нет</Button>
          <Button type="secondary" size="large" onClick={handleYes}>Да</Button>
        </div>
      }
    </div>
  )
}

Confirmation.propTypes = {
  closeModal: PropTypes.func.isRequired,
}

export default Confirmation;