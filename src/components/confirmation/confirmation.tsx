import {FC, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './confirmation.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { OPEN_MODAL, CLOSE_MODAL } from '../../services/actions/modal';

const Confirmation: FC = () => {
  const dispatch = useDispatch();
  const { text, handleRequest } = useSelector((store: any) => ({
    text: store.modal.text,
    handleRequest: store.modal.handler,
  }));

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  }

  const handleYes = () => {
    dispatch({ type: OPEN_MODAL, modalType: 'request' })
    handleRequest();
  }

  const handleEnter = (e: KeyboardEvent) => {
    e.key === 'Enter' && handleYes();
  }

  useEffect(() => {
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