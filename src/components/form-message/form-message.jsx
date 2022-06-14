import React from 'react';
import PropTypes from "prop-types";
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

FormMessage.propTypes = {
  message: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  replace: PropTypes.bool
}

export default FormMessage;
