import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './profile-orders.module.css';
import OrderList from '../../components/orders-list/orders-list';
import useWebSocketData from '../../services/hooks/useWebSocketData.jsx';
import LoadingRocket from '../../components/loading-rocket/loading-rocket.jsx';

const ProfileOrders = () => {
  const dispatch = useDispatch();
  const { userOrders } = useWebSocketData();

  React.useEffect(() => {
    dispatch({ type: 'USER_ORDERS_WS_CONNECTION_START' })

    return () => dispatch({ type: 'USER_ORDERS_WS_CLOSE_CONNECTION' });
  }, [])

  return (
    <>{userOrders ? <OrderList initialOrders={userOrders} displayStatus={true} /> : <LoadingRocket />}</>
  )
}

export default ProfileOrders;