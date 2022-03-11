import React from 'react';
import { useDispatch } from 'react-redux';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CLOSE_MODAL } from '../../services/actions/modal'

const Modal = (props) => {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch({type: CLOSE_MODAL})
  }

  React.useEffect(() => {
    const handleEscClose = (evt) => {
      evt.key === 'Escape' && closeModal();
    }

    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [])

  return ReactDOM.createPortal((
    <>
      <section className={`${styles.modal} pt-10 pr-10 pb-15 pl-10`}>
        <div className={styles.header}>
          {props.title && <h2 className={`${styles.title} text text_type_main-large`}>{props.title}</h2>}
          <button className={styles.closeButton} onClick={closeModal}><CloseIcon type="primary" /></button>
        </div>
        {props.children}
      </section>
      <ModalOverlay onClick={closeModal} />
    </>
  ), document.getElementById('modals'));
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string
}

export default Modal;
