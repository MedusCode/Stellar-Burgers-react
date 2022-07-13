import React from 'react';
import PropTypes from 'prop-types';
import styles from './orders-readiness.module.css';

const OrdersReadiness = ({ title, status, initialOrders }) => {
  return (
    <div>
      <h2 className='text text_type_main-medium mb-6'>{title}</h2>
      <ul className={styles.ordersList}>
        {initialOrders.orders.map(order => {
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

OrdersReadiness.propTypes = {
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  initialOrders: PropTypes.object.isRequired,
}

export default OrdersReadiness;