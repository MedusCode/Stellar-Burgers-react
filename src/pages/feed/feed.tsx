import { FC, useEffect } from 'react';
import { useDispatch } from '../../services/hooks/reduxHooks';
import styles from './feed.module.css';
import OrderList from '../../components/orders-list/orders-list';
import OrdersStats from '../../components/orders-stats/orders-stats';
import useWebSocketData from '../../services/hooks/useWebSocketData';
import LoadingRocket from '../../components/loading-rocket/loading-rocket';
import { ALL_ORDERS_WS_CLOSE_CONNECTION, ALL_ORDERS_WS_CONNECTION_START } from '../../services/actions/all-orders-web-socket';

const Feed: FC = () => {
  const dispatch = useDispatch();
  const { allOrdersData } = useWebSocketData()

  useEffect(() => {
    dispatch({ type: ALL_ORDERS_WS_CONNECTION_START })

    return () => {
      dispatch({ type: ALL_ORDERS_WS_CLOSE_CONNECTION })
    };
  }, [])

  return (
    <>
      {allOrdersData ?
        <>
          <h1 className='text text_type_main-large pt-10 mb-5'>Лента заказов</h1>
          <div className={styles.container}>
            <OrderList orders={allOrdersData.orders} />
            <OrdersStats ordersData={allOrdersData} />
          </div>
        </> : <LoadingRocket />
      }
    </>
  )
}

export default Feed;