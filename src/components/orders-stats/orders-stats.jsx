import React from 'react';
import PropTypes from 'prop-types';
import styles from './orders-stats.module.css';
import OrdersReadiness from '../orders-readiness/orders-readiness';

const OrderStats = ({ initialOrders }) => {

  return (
    <div className={styles.container}>
      <OrdersReadiness initialOrders={initialOrders} title='Готовы:' status='done' />
      <OrdersReadiness initialOrders={initialOrders} title='В работе:' status='pending' />
      <div className={styles.total}>
        <h2 className='text text_type_main-medium'>Выполнено за все время:</h2>
        <span className={`${styles.number} text text_type_digits-large`}>{initialOrders.total}</span>
      </div>
      <div className={styles.total}>
        <h2 className='text text_type_main-medium'>Выполнено за сегодня:</h2>
        <span className={`${styles.number} text text_type_digits-large`}>{initialOrders.totalToday}</span>
      </div>
    </div>
  )
}

OrderStats.propTypes = {
  initialOrders: PropTypes.object.isRequired,
}

export default OrderStats;