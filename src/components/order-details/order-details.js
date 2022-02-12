import React from 'react';
import styles from './order-details.module.css';
import SuccessfulOrderGif from '../../assets/images/successful-order.gif';

const OrderDetails = () => {
  return (
    <div className={styles.container}>
      <h2 className={`${styles.orderId} text text_type_digits-large mb-8`}>034536</h2>
      <h3 className='text text_type_main-medium mb-15'>идентификатор заказа</h3>
      <img className={`${styles.gif} mb-15`} src={SuccessfulOrderGif} alt='Заказ успешно создан' />
      <span className='text text_type_main-default mb-2'>Ваш заказ начали готовить</span>
      <span className='text text_type_main-default text_color_inactive mb-15'>Дождитесь готовности на орбитальной станции</span>
    </div>
  )
}

export default OrderDetails;
