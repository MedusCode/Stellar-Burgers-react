import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import IOrder from '../../types/order';
import IOrdersData from '../../types/ordersData';

const useWebSocketData = (): {userOrdersData: IOrdersData, allOrdersData: IOrdersData} => {
  const userOrdersMessages = useSelector((store: any) => store.userOrdersWebSocket.messages)
  const allOrdersMessages = useSelector((store: any) => store.allOrdersWebSocket.messages)
  const [userOrdersData, setUserOrdersData] = useState<IOrdersData>(userOrdersMessages[0]);
  const [allOrdersData, setAllOrdersData] = useState<IOrdersData>(allOrdersMessages[0]);

  useEffect(() => {
    const lastUpdate: IOrdersData = allOrdersMessages.reverse().find((message: IOrdersData) => message.success && message.orders);
    setAllOrdersData(lastUpdate);
  }, [allOrdersMessages])
  
  useEffect(() => {
    const lastUpdate: IOrdersData = userOrdersMessages.reverse().find((message: IOrdersData) => message.success && message.orders);
    if (lastUpdate) lastUpdate.orders = lastUpdate.orders.sort((a: IOrder, b: IOrder) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    setUserOrdersData(lastUpdate);
  }, [userOrdersMessages])

  return {
    userOrdersData,
    allOrdersData,
  }
}

export default useWebSocketData;