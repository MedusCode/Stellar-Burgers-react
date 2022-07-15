import { FC } from 'react';
import styles from './orders-readiness.module.css';
import IOrder from '../../types/order';

interface IOrdersReadinessProps {
  title: string;
  status: string;
  orders: Array<IOrder>;
}

const OrdersReadiness: FC<IOrdersReadinessProps> = ({ title, status, orders}) => {
  return (
    <div>
      <h2 className='text text_type_main-medium mb-6'>{title}</h2>
      <ul className={styles.ordersList}>
        {orders.map(order => {
          if (order.status === status) {
            return (
              <li className={`${styles.order} ${status === 'done' ? styles.done : ''}`} key={order.number}>
                <span className='text text_type_digits-default'>{order.number}</span>
              </li>
            )
          }
        })}
      </ul>
    </div>
  )
}

export default OrdersReadiness;