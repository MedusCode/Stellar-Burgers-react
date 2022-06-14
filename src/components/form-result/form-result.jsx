import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './form-result.module.css';
import { RESET_REQUEST_STATUS } from '../../services/actions/user.jsx'

const FormResult = ({message, buttonText, href, reset}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const resetRequestStatus = () => {
    href && history.replace({ pathname: href })
    if (reset) reset()
    else dispatch({ type: RESET_REQUEST_STATUS });
  }

  return (
    <div className={`${styles.container} mb-4`}>
      <span className={`${styles.text} text text_type_main-default mb-2`}>{message}</span>
      {buttonText && <button onClick={resetRequestStatus} className={`${styles.button} text text_type_main-default`}>
        {buttonText}
      </button>}
    </div>
  )
}

export default FormResult;