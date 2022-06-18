import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './feed.module.css';
import OrderList from '../../components/orders-list/orders-list';
import OrdersStats from '../../components/orders-stats/orders-stats.jsx';
import useWebSocketData from '../../services/hooks/useWebSocketData.jsx';
import LoadingRocket from '../../components/loading-rocket/loading-rocket.jsx';
import { ALL_ORDERS_WS_CLOSE_CONNECTION, ALL_ORDERS_WS_CONNECTION_START } from '../../services/actions/all-orders-web-socket';

const Feed = () => {
  const dispatch = useDispatch();
  const { allOrders } = useWebSocketData()

  React.useEffect(() => {
    dispatch({ type: ALL_ORDERS_WS_CONNECTION_START })

    return () => dispatch({ type: ALL_ORDERS_WS_CLOSE_CONNECTION });
  }, [])

  return (
    <>
      {allOrders ?
        <>
          <h1 className='text text_type_main-large pt-10 mb-5'>Лента заказов</h1>
          <div className={styles.container}>
            <OrderList initialOrders={allOrders} />
            <OrdersStats initialOrders={allOrders} />
          </div>
        </> : <LoadingRocket />
      }
    </>
  )
}

export default Feed;