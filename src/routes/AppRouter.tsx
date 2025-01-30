import { Route, Routes } from 'react-router-dom';

import PrivateRoute from '../hoc/PrivateRoute';
import Main from '../pages/Main';
import { publicRoutes } from './routes';
import { RoutePaths } from './routePaths';

export const AppRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route path={RoutePaths.MAIN} element={<PrivateRoute element={Main} />} />
      {publicRoutes.map(({ path, Page }) => (
        <Route key={path} path={path} element={<Page />} />
      ))}
    </Routes>
  );
};
