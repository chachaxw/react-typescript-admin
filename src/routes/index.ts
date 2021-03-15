import AppRoutes from './AppRoutes';
import { appRoutes, RouteConfig as RouteConfigTyped } from './config';
import { ExceptionRoutes, Routes } from './routes';
import RouteWithSubRoutes from './RouteWithSubRoutes';

export type RouteConfig = RouteConfigTyped;

export { AppRoutes, appRoutes, ExceptionRoutes, RouteWithSubRoutes, Routes };
