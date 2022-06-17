import React from 'react';
import styles from './profile-orders.module.css';
import OrderList from '../../components/orders-list/orders-list';

const ProfileOrders = () => {
  return (
      <OrderList displayStatus={true} />
  )
}

export default ProfileOrders;