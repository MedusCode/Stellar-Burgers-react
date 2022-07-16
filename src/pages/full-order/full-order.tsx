import {FC, useState, useEffect} from 'react';
import styles from './full-order.module.css';
import { useDispatch } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import Order from '../../components/order/order'
import NotFound from '../not-found/not-found';
import useWebSocketData from '../../services/hooks/useWebSocketData';
import LoadingRocket from '../../components/loading-rocket/loading-rocket';
import { ALL_ORDERS_WS_CLOSE_CONNECTION, ALL_ORDERS_WS_CONNECTION_START } from '../../services/actions/all-orders-web-socket';
import { USER_ORDERS_WS_CLOSE_CONNECTION, USER_ORDERS_WS_CONNECTION_START } from '../../services/actions/user-orders-web-socket';
import IOrder from '../../types/order';
import ILocation from '../../types/location';

interface IFullOrderParams {
  id: string;
}

const FullOrder: FC = () => {
  const dispatch = useDispatch();
  const { allOrdersData, userOrdersData } = useWebSocketData();
  const location = useLocation<ILocation>();
  const params = useParams<IFullOrderParams>();
  const [activeOrder, setActiveOrder] = useState<IOrder | null>(null);
  const [isOrderExist, setIsOrderExist] = useState<boolean>(true);

  useEffect(() => {
    if (location.pathname.includes('feed')) dispatch({ type: ALL_ORDERS_WS_CONNECTION_START })
    else dispatch({ type: USER_ORDERS_WS_CONNECTION_START })

    return () => {
      dispatch({ type: ALL_ORDERS_WS_CLOSE_CONNECTION });
      dispatch({ type: USER_ORDERS_WS_CLOSE_CONNECTION });
    }
  }, [])

  useEffect(() => {
    if (allOrdersData || userOrdersData ) {
      const serverResponse = location.pathname.includes('feed') ? allOrdersData : userOrdersData;
      const order = serverResponse.orders.find(order => order._id === params.id); 
      if (serverResponse.orders.length > 0 && !order) setIsOrderExist(false)
      else {
        setActiveOrder(order || null);
      }
    }
  }, [allOrdersData, userOrdersData]);

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