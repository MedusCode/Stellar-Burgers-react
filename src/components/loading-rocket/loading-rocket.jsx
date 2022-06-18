import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from "prop-types";
import styles from './loading-rocket.module.css';
import rocket from '../../assets/images/rocket.gif'

const LoadingRocket = ({ below }) => {
  const allOrdersError = useSelector(store => store.allOrdersWebSocket.error)
  const userOrdersError = useSelector(store => store.userOrdersWebSocket.error)

  return (
    <>{ allOrdersError || userOrdersError
      ? <span>Произошла ошибка сервера</span>
      : <img className={`${styles.img} ${below ? styles.below : ''}`} src={rocket}></img>
    }</>
  )
}

LoadingRocket.propTypes = {
  below: PropTypes.bool
}

export default LoadingRocket;