import React from 'react';
import { Navigate } from 'react-router-dom';

import { RoutePaths } from '../routes/routePaths';
import { isAuth } from '../utils/localStorageActions';

type PrivateRouteProps = {
  element: React.ComponentType;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element: Element }) => {
  if (!isAuth()) {
    return <Navigate to={RoutePaths.LOGIN} replace />;
  }

  return <Element />;
};

export default PrivateRoute;
