// Global routes enum
export enum Routes {
  App = '/app',
  Login = '/login',

  // 首页
  Dashboard = '/app/dashboard',

  // 异常报错
  NoPermission = '/exception/403',
  NotFound = '/exception/404',
  ServerError = '/exception/500',
  AppNoPermission = '/app/exception/403',
  AppNotFound = '/app/exception/404',
  AppServerError = '/app/exception/500',
}

// 异常路由列表
export const ExceptionRoutes: string[] = [Routes.AppNoPermission, Routes.AppNotFound, Routes.AppServerError];
