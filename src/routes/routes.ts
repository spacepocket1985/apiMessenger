import Main from '../pages/Main';
import Login from '../pages/Login';
import Page404 from '../pages/Page404';

import { RoutePaths } from './routePaths';

export const publicRoutes = [
  {
    path: RoutePaths.MAIN,
    Page: Main,
  },
  {
    path: RoutePaths.LOGIN,
    Page: Login,
  },

  {
    path: RoutePaths.PAGE404,
    Page: Page404,
  },
];
