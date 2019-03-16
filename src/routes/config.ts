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
      name: '订单中心',
      icon: 'user',
      path: '/app/order',
      component: 'OrderCenter',
    },
    {
      name: '地图中心',
      icon: 'environment',
      path: '/app/map',
      component: 'MapCenter',
    },
    {
      name: '设置中心',
      icon: 'setting',
      path: '/app/setting',
      component: 'SettingCenter',
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
