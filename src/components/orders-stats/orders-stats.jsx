import React from 'react';
import styles from './orders-stats.module.css';
import OrdersReadiness from '../orders-readiness/orders-readiness';

const OrderStats = () => {
  const storage = {
  "total": 1232,
  "totalToday": 87
  }

  return (
    <div className={styles.container}>
      <OrdersReadiness title='Готовы:' status='done' />
      <OrdersReadiness title='В работе:' status='pending' />
      <div className={styles.total}>
        <h2 className='text text_type_main-medium'>Выполнено за все время:</h2>
        <span className={`${styles.number} text text_type_digits-large`}>{storage.total}</span>
      </div>
      <div className={styles.total}>
        <h2 className='text text_type_main-medium'>Выполнено за сегодня:</h2>
        <span className={`${styles.number} text text_type_digits-large`}>{storage.totalToday}</span>
      </div>
    </div>
  )
}

export default OrderStats;