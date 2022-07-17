import { FC } from 'react';
import styles from './orders-stats.module.css';
import OrdersReadiness from '../orders-readiness/orders-readiness';
import IOrdersData from '../../types/ordersData';

interface IOrderStatusProps {
  ordersData: IOrdersData;
}

const OrderStats: FC<IOrderStatusProps> = ({ ordersData }) => {

  return (
    <div className={styles.container}>
      <OrdersReadiness orders={ordersData.orders} title='Готовы:' status='done' />
      <OrdersReadiness orders={ordersData.orders} title='В работе:' status='pending' />
      <div className={styles.total}>
        <h2 className='text text_type_main-medium'>Выполнено за все время:</h2>
        <span className={`${styles.number} text text_type_digits-large`}>{ordersData.total}</span>
      </div>
      <div className={styles.total}>
        <h2 className='text text_type_main-medium'>Выполнено за сегодня:</h2>
        <span className={`${styles.number} text text_type_digits-large`}>{ordersData.totalToday}</span>
      </div>
    </div>
  )
}

export default OrderStats;