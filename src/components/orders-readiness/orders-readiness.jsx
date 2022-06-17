import React from 'react';
import styles from './orders-readiness.module.css';

const OrdersReadiness = ({ title, status }) => {
  const storage = {
    "success": true,
    "orders": [
      {
        "status": "done",
        "number": '034533', 
      },
      {
        "status": "done",
        "number": '034533', 
      },
      {
        "status": "done",
        "number": '034533', 
      },
      {
        "status": "done",
        "number": '034533', 
      },
      {
        "status": "done",
        "number": '034533', 
      },
      {
        "status": "done",
        "number": '034533', 
      },
      {
        "status": "done",
        "number": '034533', 
      },
      {
        "status": "done",
        "number": '034533', 
      },
      {
        "status": "done",
        "number": '034533', 
      },
      {
        "status": "done",
        "number": '034533', 
      },
      {
        "status": "done",
        "number": '034533', 
      },
      {
        "status": "done",
        "number": '034533', 
      },
      {
        "status": "done",
        "number": '034533', 
      },
      {
        "status": "done",
        "number": '034533', 
      },
      {
        "status": "done",
        "number": '034533', 
      },
      {
        "status": "done",
        "number": '034533', 
      },

    ],
    "total": 2,
    "totalToday": 2
  } 



  return (
    <div>
      <h2 className='text text_type_main-medium mb-6'>{title}</h2>
      <ul className={styles.ordersList}>
        {storage.orders.map(order => {
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