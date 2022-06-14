import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import styles from './profile.module.css';
import ProfileTab from '../../components/profile-tab/profile-tab';
import ProfileInfo from '../profile-info/profile-info';
import ProfileOrders from '../profile-orders/profile-orders.jsx'

const Profile = () => {
  const { path } = useRouteMatch();

  return (
    <div className={`${styles.container} pt-30`}>
      <ProfileTab />
      <Switch>
        <Route path={path} exact>
          <ProfileInfo />
        </Route>

        <Route path={`${path}/orders`} exact>
          <ProfileOrders />
        </Route>
      </Switch>
    </div>
  )
}

export default Profile;
