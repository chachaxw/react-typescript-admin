import { message } from 'antd';
import * as dateFns from 'date-fns';

import Dashboard from '../pages/Dashboard/Dashboard';
import { DashboardService } from '../services/DashboardService';

// Dashboard state interface
interface Dashboard {
    loading: boolean;
}

export default {
    namespace: 'dashboard', // model的命名空间

    state: { // 应用的状态数据

    },

    effects: {

    },

    reducers: { // Redux reducers

    },

    subscriptions: {
        setup({ dispatch, history }: any) {
            return history.listen(({ pathname }: any) => {
                if (pathname === '/app/dashboard') {

                }
            });
        },
    },
};
