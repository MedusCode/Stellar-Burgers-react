import React from 'react';
import styles from './profile.module.css';
import ProfileTab from '../../components/profile-tab/profile-tab';
import ProfileInfo from '../profile-info/profile-info';

const Profile = () => {
  return (
    <div className={`${styles.container} pt-30`}>
      <ProfileTab />
      <ProfileInfo />
    </div>
  )
}

export default Profile;
