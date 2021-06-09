import React from 'react';
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route = ({
  isPrivate = false,
  component: Component,
  ...rest
}: RouteProps) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        if (isPrivate && !!user) {
          return <Component />;
        }

        if (isPrivate && !user) {
          return (
            <Redirect to={{ pathname: '/login', state: { from: location } }} />
          );
        }

        return <Component />;
      }}
    />
  );
};

export default Route;
