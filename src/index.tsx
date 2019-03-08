import './index.css';

import { message } from 'antd';
import dva from 'dva';
import createLoading from 'dva-loading';
import * as React from 'react';
import { reducer as formReducer } from 'redux-form';
import { createLogger } from 'redux-logger';

import { Global } from './models';
import Page from './Page';

const errorDuration = 3;

const app = dva({
    onError(e) {
        // Catch redux action errors
        message.error(e.message, errorDuration);
    },

    onAction: createLogger(),

    // 其他第三方 Reducer 配置
    extraReducers: {
        form: formReducer,
    },
});

// 第三方插件
app.use(createLoading());

app.router((props: any) => <Page {...props} />);

// Register dva global model
app.model(Global);

app.start('#root');
