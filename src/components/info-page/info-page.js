import React from 'react';
import PropTypes from 'prop-types';
import styles from './info-page.module.css';

const InfoPage = (props) => {
  return (
    <main className={styles.container}>
      <h1 className='text text_type_main-large mb-5'>{props.children}</h1>
      {props.info && <span className='text text_type_main-medium'>{props.info}</span>}
    </main>
  )
}

InfoPage.propTypes = {
  children: PropTypes.any.isRequired,
  info: PropTypes.string
}

export default InfoPage;
