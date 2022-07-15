import React from 'react';
import { useSelector } from 'react-redux';

const useWebSocketData = () => {
  const userOrdersMessages = useSelector(store => store.userOrdersWebSocket.messages)
  const allOrdersMessages = useSelector(store => store.allOrdersWebSocket.messages)
  const [userOrdersData, setUserOrdersData] = React.useState(null);
  const [allOrdersData, setAllOrdersData] = React.useState(null);

  React.useEffect(() => {
    const lastUpdate = allOrdersMessages.reverse().find(message => message.success && message.orders);
    setAllOrdersData(lastUpdate);
  }, [allOrdersMessages])
  
  React.useEffect(() => {
    const lastUpdate = userOrdersMessages.reverse().find(message => message.success && message.orders);
    if (lastUpdate) lastUpdate.orders = lastUpdate.orders.sort((a,b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    setUserOrdersData(lastUpdate);
  }, [userOrdersMessages])

  return {
    userOrdersData,
    allOrdersData,
  }
}

export default useWebSocketData;