import dva from 'dva';
import createLoading from 'dva-loading';
import * as React from 'react';
import { reducer as formReducer } from 'redux-form';
import { createLogger } from 'redux-logger';

import { Env, EnvType } from './env';
import './index.css';
import { Global } from './models';
import Page from './Page';
import { errorHandle } from './utils/errorHandle';

const logger = Env === EnvType.Development ? createLogger() : () => null;

const app: any = dva({
  onError(error: any) {
    // Catch redux action errors
    errorHandle(error, app._store.dispatch);
  },

  onAction: logger,

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
