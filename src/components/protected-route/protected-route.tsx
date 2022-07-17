import { FC } from 'react';
import { useSelector } from '../../services/hooks/reduxHooks';
import { Route, Redirect, RouteProps } from 'react-router-dom';

const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
    const isAuthorized = useSelector(store => store.user.isAuthorized)

    return (
    <Route {...rest} 
      render={({ location }) => 
        isAuthorized ? (children) : (<Redirect to={{ pathname: '/login', state: { from: location } }}/>)
      }
    />
  );
}

export default ProtectedRoute;