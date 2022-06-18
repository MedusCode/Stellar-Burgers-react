import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ children, ...rest }) => {
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