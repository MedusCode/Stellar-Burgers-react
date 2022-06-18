import React from 'react';
import { useSelector } from 'react-redux';

const useWebSocketData = () => {
  const userOrdersMessages = useSelector(store => store.userOrdersWebSocket.messages)
  const allOrdersMessages = useSelector(store => store.allOrdersWebSocket.messages)
  const [userOrders, setUserOrders] = React.useState(null);
  const [allOrders, setAllOrders] = React.useState(null);

  React.useEffect(() => {
    const lastUpdate = allOrdersMessages.find(message => message.success && message.orders);
    setAllOrders(lastUpdate);
  }, [allOrdersMessages])
  
  React.useEffect(() => {
    const lastUpdate = userOrdersMessages.find(message => message.success && message.orders);
    if (lastUpdate) lastUpdate.orders = lastUpdate.orders.sort((a,b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    setUserOrders(lastUpdate);
  }, [userOrdersMessages])

  return {
    userOrders,
    allOrders,
  }
}

export default useWebSocketData;