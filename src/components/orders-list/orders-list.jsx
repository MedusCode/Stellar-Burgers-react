import React from 'react';
import PropTypes from 'prop-types';
import styles from './orders-list.module.css';
import OrderCard from '../order-card/order-card';

const OrderList = ({ initialOrders, displayStatus }) => { 
  const orderListRef = React.useRef(null);

  React.useEffect(() => {
    const handleOrderListSizing = () => {
      orderListRef.current.style.maxHeight = `${window.innerHeight - orderListRef.current.offsetTop}px`;
    }

    window.addEventListener('resize', handleOrderListSizing);
    handleOrderListSizing()

    return () => {
      window.removeEventListener('resize', handleOrderListSizing);
    }
  }, [])

  return (
    <ul className={`${styles.container} pr-4`} ref={orderListRef}>
      {initialOrders.orders.map(order => <OrderCard initialOrder={order} displayStatus={displayStatus} key={order._id} />)}
    </ul>
  )
}

OrderList.propTypes = {
  initialOrders: PropTypes.object.isRequired,
  displayStatus: PropTypes.bool
}

export default OrderList;