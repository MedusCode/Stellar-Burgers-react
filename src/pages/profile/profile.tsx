import { FC } from 'react';
import { Switch, useRouteMatch, useLocation } from 'react-router-dom';
import styles from './profile.module.css';
import ProtectedRoute from '../../components/protected-route/protected-route';
import ProfileTab from '../../components/profile-tab/profile-tab';
import ProfileInfo from '../profile-info/profile-info';
import ProfileOrders from '../profile-orders/profile-orders';
import ILocation from '../../types/location';

interface IProfileMatch {
  path: string;
}

const Profile: FC = () => {
  const location = useLocation<ILocation>();
  const { path } = useRouteMatch<IProfileMatch>();

  return (
    <div className={`${styles.container} ${location.pathname === '/profile' ? '' : styles.orders} pt-10`}>
      <ProfileTab />
      <Switch>
        <ProtectedRoute path={path} exact>
          <ProfileInfo />
        </ProtectedRoute>
        <ProtectedRoute path={`${path}/orders`} exact>
          <ProfileOrders />
        </ProtectedRoute>
      </Switch>
    </div>
  )
}

export default Profile;
