import * as React from 'react';

import { BrowserRouter, Redirect, Route, Switch } from 'dva/router';
import { Env, EnvType } from './env';

import { hot } from 'react-hot-loader';
import App from './App';
import NoPermission from './pages/Exception/403';
import NotFound from './pages/Exception/404';
import ServerError from './pages/Exception/500';
import Login from './pages/Login/Login';

// Global pages router
const Page = ({ app }: any) => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/app/dashboard" push />} />
      <Route exact path="/app" render={() => <Redirect to="/app/dashboard" push />} />
      <Route path="/login" component={Login} />
      <Route path="/app" render={(props: any) => <App app={app} {...props} />} />
      <Route path="/exception/403" component={NoPermission} />
      <Route path="/exception/404" component={NotFound} />
      <Route path="/exception/500" component={ServerError} />
      <Redirect to="/exception/404" />
    </Switch>
  </BrowserRouter>
);

export default Env === EnvType.Development ? hot(module)(Page) : Page;
