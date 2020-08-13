import Loadable from 'react-loadable';

import { Loading } from '../../components';

const NoPermission = Loadable({
  loader: () => import('./403'),
  loading: Loading,
});

const NotFound = Loadable({
  loader: () => import('./404'),
  loading: Loading,
});

const ServerError = Loadable({
  loader: () => import('./500'),
  loading: Loading,
});

export { NoPermission, NotFound, ServerError };
