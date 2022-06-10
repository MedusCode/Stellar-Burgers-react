import React from 'react';
import styles from './form-message.module.css';
import { Link } from 'react-router-dom';

const FormMessage = ({ message, linkText, link, replace }) => {

  return (
    <div className="mb-4">
      <span className={`${styles.text} text text_type_main-default mr-2`}>{message}</span>
      <Link to={link} replace={replace} className={`${styles.link} text text_type_main-default`}>
        {linkText}
      </Link>
    </div>
  )
}

export default FormMessage;
