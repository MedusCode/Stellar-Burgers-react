import React from 'react';
import styles from './feed.module.css';
import OrderList from '../../components/orders-list/orders-list';
import OrdersStats from '../../components/orders-stats/orders-stats.jsx'

const Feed = () => {
  return (
    <>
      <h1 className='text text_type_main-large pt-10 mb-5'>Лента заказов</h1>
      <div className={styles.container}>
        <OrderList />
        <OrdersStats />
      </div>
    </>
  )
}

export default Feed;