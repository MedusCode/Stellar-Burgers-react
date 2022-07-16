import { FC } from 'react';
import { useSelector } from '../../services/hooks/reduxHooks';
import styles from './loading-rocket.module.css';
import rocket from '../../assets/images/rocket.gif';

interface ILoadingRocketProps {
  below?: boolean;
}

const LoadingRocket: FC<ILoadingRocketProps> = ({ below }) => {
  const allOrdersError = useSelector(store => store.allOrdersWebSocket.error)
  const userOrdersError = useSelector(store => store.userOrdersWebSocket.error)

  return (
    <>
      { allOrdersError || userOrdersError
        ? <span>Произошла ошибка сервера</span>
        : <img className={`${styles.img} ${below ? styles.below : ''}`} src={rocket}></img>
      }
    </>
  )
}

export default LoadingRocket;