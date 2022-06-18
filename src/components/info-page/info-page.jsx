import React from 'react';
import PropTypes from 'prop-types';
import styles from './info-page.module.css'

const InfoPage = ({ children, info }) => {
  return (
    <section className={styles.container}>
      <h1 className='text text_type_main-large mb-5'>{children}</h1>
      {info && <span className='text text_type_main-medium'>{info}</span>}
    </section>
  )
}

InfoPage.propTypes = {
  children: PropTypes.any.isRequired,
  info: PropTypes.string
}

export default InfoPage;
