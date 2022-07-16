import { FC, useRef, useEffect } from 'react';
import styles from './orders-list.module.css';
import OrderCard from '../order-card/order-card';
import IOrder from '../../types/order';

interface IOrderListProps {
  orders: Array<IOrder>;
  displayStatus?: boolean;
}

const OrderList: FC<IOrderListProps> = ({ orders, displayStatus }) => { 
  const orderListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleOrderListSizing = () => {
      if (orderListRef.current) {
        orderListRef.current.style.maxHeight = `${window.innerHeight - orderListRef.current.offsetTop}px`;
      }
    }

    window.addEventListener('resize', handleOrderListSizing);
    handleOrderListSizing()

    return () => {
      window.removeEventListener('resize', handleOrderListSizing);
    }
  }, [])

  return (
    <ul className={`${styles.container} pr-4`} ref={orderListRef}>
      {orders.map(order => <OrderCard initialOrder={order} displayStatus={displayStatus} key={order._id} />)}
    </ul>
  )
}

export default OrderList;