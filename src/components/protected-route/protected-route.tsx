import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';

const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
    const isAuthorized = useSelector((store: any) => store.user.isAuthorized)

    return (
    <Route {...rest} 
      render={({ location }) => 
        isAuthorized ? (children) : (<Redirect to={{ pathname: '/login', state: { from: location } }}/>)
      }
    />
  );
}

export default ProtectedRoute;