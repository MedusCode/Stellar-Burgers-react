import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './confirmation.module.css'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { OPEN_MODAL, CLOSE_MODAL } from '../../services/actions/modal.jsx';

const Confirmation = () => {
  const dispatch = useDispatch();
  const { text, handleRequest, confirmationType } = useSelector(store => ({
    text: store.modal.text,
    handleRequest: store.modal.handler,
    confirmationType: store.modal.confirmationType
  }));

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  }

  const handleYes = () => {
    dispatch({ type: OPEN_MODAL, modalType: 'request', requestType: confirmationType })
    handleRequest();
  }

  const handleEnter = e => {
    e.key === 'Enter' && handleYes();
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleEnter);

    return () => {
      document.removeEventListener('keydown', handleEnter);
    }
  }, [])

  return (
    <div className={styles.container} >
      <span className={`${styles.text} text text_type_main-medium`}>{text}</span>
      <div className={styles.buttonsContainer}>
        <Button type="secondary" size="large" onClick={closeModal}>Нет</Button>
        <Button type="secondary" size="large" onClick={handleYes}>Да</Button>
      </div>
    </div>
  )
}

export default Confirmation;