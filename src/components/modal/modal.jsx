import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

const Modal = (props) => {
  React.useEffect(() => {
    const handleEscClose = (evt) => {
      evt.key === 'Escape' && props.onClose();
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
          <button className={styles.closeButton} onClick={props.onClose}><CloseIcon type="primary" /></button>
        </div>
        {props.children}
      </section>
      <ModalOverlay onClick={props.onClose} />
    </>
  ), document.getElementById('modals'));
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string
}

export default Modal;
