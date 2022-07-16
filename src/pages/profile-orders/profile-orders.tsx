import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import OrderList from '../../components/orders-list/orders-list';
import useWebSocketData from '../../services/hooks/useWebSocketData';
import LoadingRocket from '../../components/loading-rocket/loading-rocket';
import { USER_ORDERS_WS_CLOSE_CONNECTION, USER_ORDERS_WS_CONNECTION_START } from '../../services/actions/user-orders-web-socket.jsx';

const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { userOrdersData } = useWebSocketData();

  useEffect(() => {
    dispatch({ type: USER_ORDERS_WS_CONNECTION_START })

    return () => {
      dispatch({ type: USER_ORDERS_WS_CLOSE_CONNECTION })
    }
  }, [])

  return (
    <>
      {userOrdersData ? <OrderList orders={userOrdersData.orders} displayStatus={true} /> : <LoadingRocket />}
    </>
  )
}

export default ProfileOrders;