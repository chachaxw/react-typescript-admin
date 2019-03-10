export interface RouteConfig {
  name: string;
  icon: string;
  path: string;
  auth?: string;
  query?: string;
  hideInMenu?: boolean;
  component: string;
  children?: RouteConfig[];
}

export default {
  app: [
    {
      name: '控制台',
      icon: 'dashboard',
      path: '/app/dashboard',
      component: 'Dashboard',
    },
    {
      name: '用户中心',
      icon: 'user',
      path: '/app/user',
      component: 'UserCenter',
    },
  ],
  user: [],
};
