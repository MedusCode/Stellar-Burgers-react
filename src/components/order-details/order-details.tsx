import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './order-details.module.css';
import SuccessfulOrderGif from '../../assets/images/successful-order.gif';
import { makeOrder } from '../../services/actions/order';
import LoadingRocket from '../loading-rocket/loading-rocket';

const OrderDetails: FC = () => {
  const dispatch = useDispatch();
  const { orderNum, orderSuccess, orderFailed } = useSelector((store: any) => ({
    orderNum: store.order.orderNum,
    orderSuccess: store.order.orderSuccess,
    orderFailed: store.order.orderFailed,
  }))

  useEffect(() => {
    dispatch(makeOrder())
  }, [])

  return (
    <> 
      {orderSuccess ?
        <div className={styles.container}>
          <h2 className={`${styles.orderId} text text_type_digits-large mb-8`}>{orderNum}</h2>
          <h3 className='text text_type_main-medium mb-15'>идентификатор заказа</h3>
          <img className={`${styles.gif} mb-15`} src={SuccessfulOrderGif} alt='Заказ успешно создан' />
          <span className='text text_type_main-default mb-2'>Ваш заказ начали готовить</span>
          <span className='text text_type_main-default text_color_inactive mb-15'>Дождитесь готовности на орбитальной станции</span>
        </div>
        : orderFailed ?
          <h2 className={`${styles.message} text text_type_main-large`}>Произошла ошибка :(</h2>
          : <>
              <h2 className={`${styles.message} text text_type_main-large`}>Отправляем заказ...</h2>
              <LoadingRocket below={true} />
            </>
        }
    </>
  )
}

export default OrderDetails;
