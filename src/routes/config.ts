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
            icon: 'calculator',
            path: '/app/dashboard',
            component: 'Dashboard',
        },
    ],
    user: [],
};
