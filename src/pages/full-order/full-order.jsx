import React from 'react';
import styles from './full-order.module.css';
import { useDispatch } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import Order from '../../components/order/order.jsx'
import NotFound from '../not-found/not-found.jsx';
import useWebSocketData from '../../services/hooks/useWebSocketData.jsx';
import LoadingRocket from '../../components/loading-rocket/loading-rocket.jsx';
import { ALL_ORDERS_WS_CLOSE_CONNECTION, ALL_ORDERS_WS_CONNECTION_START } from '../../services/actions/all-orders-web-socket';
import { USER_ORDERS_WS_CLOSE_CONNECTION, USER_ORDERS_WS_CONNECTION_START } from '../../services/actions/user-orders-web-socket';

const FullOrder = () => {
  const dispatch = useDispatch();
  const { allOrders, userOrders } = useWebSocketData();
  const location = useLocation();
  const params = useParams();
  const [activeOrder, setActiveOrder] = React.useState(null);
  const [isOrderExist, setIsOrderExist] = React.useState(true);

  React.useEffect(() => {
    if (location.pathname.includes('feed')) dispatch({ type: ALL_ORDERS_WS_CONNECTION_START })
    else dispatch({ type: USER_ORDERS_WS_CONNECTION_START })

    return () => {
      dispatch({ type: ALL_ORDERS_WS_CLOSE_CONNECTION });
      dispatch({ type: USER_ORDERS_WS_CLOSE_CONNECTION });
    }
  }, [])

  React.useEffect(() => {
    if (allOrders || userOrders) {
      const serverResponse = location.pathname.includes('feed') ? allOrders : userOrders;
      const order = serverResponse.orders.find(order => order._id === params.id); 
      if (serverResponse.orders.length > 0 && !order) setIsOrderExist(false)
      else {
        setActiveOrder(order);
      }
    }
  }, [allOrders, userOrders]);

  if (!isOrderExist) return (
    <NotFound />
  )

  return (
    <div className={`${styles.container} pt-30`}>
      {activeOrder ? <Order order={activeOrder} /> : <LoadingRocket />}
    </div>
  )
}

export default FullOrder;