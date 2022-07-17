import { FC, useEffect } from 'react';
import { useSelector } from '../../services/hooks/reduxHooks';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

enum ModalSize {
  small = 'small',
  default = 'default'
}

interface IModalProps {
  onClose: () => void;
  size?: ModalSize;
}

const Modal: FC<IModalProps> = ({ onClose, size, children }) => {
  const userRequest = useSelector(store => store.user.request);
  const orderRequest = useSelector(store => store.order.orderRequest);
  const request: boolean = userRequest || orderRequest;

  const handleModalClose = () => {
    !request && onClose();
  }

  useEffect(() => {
    const handleEscClose = (evt: KeyboardEvent) => {
      evt.key === 'Escape' && handleModalClose();
    }

    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [request])

  return ReactDOM.createPortal((
    <>
      <section className={size === ModalSize.small ? `${styles.smallModal} pt-10 pr-10 pb-2 pl-10` : `${styles.modal} pt-10 pr-10 pb-15 pl-10`}>
        {children}
        {!request && <button className={styles.closeButton} onClick={handleModalClose}><CloseIcon type="primary" /></button>}
      </section>
      <ModalOverlay onClick={handleModalClose} />
    </>
  ), document.getElementById('modals')!);
}

export default Modal;
export { ModalSize };
