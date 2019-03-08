import * as React from 'react';
import Loadable from 'react-loadable';

import { Loading } from '../components';
import { registerModel } from '../models';

const Dashboard = Loadable.Map({
    loader: {
        Dashboard: () => import('./Dashboard/Dashboard'),
        model: () => import('../models/dashboard'),
    },
    loading: Loading,
    render(loaded: any, props: any) {
        const Dashboard = loaded.Dashboard.default;
        const model = loaded.model.default;
        registerModel(props.app, model);
        return <Dashboard {...props} />;
    },
});

const Order = Loadable({
    loader: () => import('./Order/Order'),
    loading: Loading,
});

export default {
    Dashboard,
    Order,
};
