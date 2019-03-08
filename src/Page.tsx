import * as React from 'react';

import { HashRouter, Redirect, Route, Switch } from 'dva/router';
import { Env, EnvType } from './env';

import { hot } from 'react-hot-loader';
import App from './App';
import NotFound from './pages/Exception/404';
import Login from './pages/Login/Login';

// Global pages router
const Page = ({ app }: any) => (
    <HashRouter>
        <Switch>
            <Route exact path="/" render={() => <Redirect to="/app/dashboard" push />} />
            <Route path="/login" component={Login} />
            <Route path="/app" render={(props: any) => <App app={app} {...props} />} />
            <Route path="/exception/404" component={NotFound} />
            <Redirect to="/exception/404" />
        </Switch>
    </HashRouter>
);

export default Env === EnvType.Development ? hot(module)(Page) : Page;
