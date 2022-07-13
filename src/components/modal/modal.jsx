import React from 'react';
import { useSelector } from 'react-redux';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';;

const Modal = ({ onClose, size, children }) => {
  const userRequest = useSelector(store => store.user.request);
  const orderRequest = useSelector(store => store.order.orderRequest);
  const request = userRequest || orderRequest;

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
        {children}
        {!request && <button className={styles.closeButton} onClick={handleModalClose}><CloseIcon type="primary" /></button>}
      </section>
      <ModalOverlay onClick={handleModalClose} />
    </>
  ), document.getElementById('modals'));
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  size: PropTypes.string,
  titleSize: PropTypes.string,
}

export default Modal;
