import React from 'react';
import { useSelector } from 'react-redux';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

const Modal = ({title, onClose, size, children}) => {
  const request = useSelector(store => store.user.request)

  const handleModalClose = () => {
    !request && onClose();
  }

  React.useEffect(() => {
    const handleEscClose = (evt) => {
      evt.key === 'Escape' && handleModalClose();
    }

    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [request])

  return ReactDOM.createPortal((
    <>
      <section className={size === 'small' ? `${styles.smallModal} pt-10 pr-10 pb-2 pl-10` : `${styles.modal} pt-10 pr-10 pb-15 pl-10`}>
        <div className={styles.header}>
          {title && <h2 className={`${styles.title} text text_type_main-large`}>{title}</h2>}
          {!request && <button className={styles.closeButton} onClick={handleModalClose}><CloseIcon type="primary" /></button>}
        </div>
        {children}
      </section>
      <ModalOverlay onClick={handleModalClose} />
    </>
  ), document.getElementById('modals'));
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  size: PropTypes.string
}

export default Modal;
