import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CLOSE_MODAL } from '../../services/actions/modal.jsx';

const Modal = ({ size, children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { modalType, orderNum } = useSelector(store => ({
    modalType: store.modal.modalType,
    orderNum: store.modal.currentOrder.number
  }))
  const request = useSelector(store => store.user.request)

  const onClose = () => {
    if (modalType === 'ingredient') window.history.replaceState(null, 'Конструктор', `/`);
    else if (modalType === 'order') {
      window.history.replaceState(null, 'Конструктор', location.pathname.includes('feed') ? '/feed' : '/profile/orders');
    }
    dispatch({type: CLOSE_MODAL})
  }

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
          {modalType === 'ingredient' && <h2 className={`${styles.title} text text_type_main-large`}>Детали ингредиента</h2>}
          {modalType === 'order' && <h2 className={`${styles.title} text text_type_digits-default`}>{`#${orderNum}`}</h2>}
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
  size: PropTypes.string
}

export default Modal;
