import { Redirect, Route, RouteComponentProps, Switch } from 'dva/router';
import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import routesConfig, { RouteConfig } from './config';

import queryString from 'query-string';
import { Auth } from '../models/global';
import AllPages from '../pages';
import NoPermission from '../pages/Exception/403';
import NotFound from '../pages/Exception/404';
import ServerError from '../pages/Exception/500';

interface InternalProps {
  app: any;
  auth: Auth;
}

export default class AppRoutes extends Component<InternalProps> {

  public requireAuth(permission: string, component: any) {
    const { auth } = this.props;
    const { permissions } = auth;

    if (!permissions || !permissions.includes(permission)) {
      return <Redirect to="/404" />;
    }

    return component;
  }

  public requireLogin(component: any, permission?: string) {
    const { auth } = this.props;
    const { isAuthenticated, permissions } = auth;

    if (!isAuthenticated || !permissions) { // 判断是否登录
      return <Redirect to={'/login'} />;
    }

    return permission ? this.requireAuth(permission, component) : component;
  }

  public render() {
    const { app } = this.props;

    return (
      <Switch>
        {Object.keys(routesConfig).map((key: string) =>
          routesConfig[key].map((config: RouteConfig, index: number) => {
            const route = (config: RouteConfig) => {
              const { path, component, name } = config;
              const Component = AllPages[component];

              return Component && (
                <Route
                  exact
                  key={index}
                  path={path}
                  render={(props: RouteComponentProps<any>) => {
                    // 匹配 location query 字段
                    const reg = /\?\S*/g;
                    const queryParams = window.location.hash.match(reg);
                    const { params } = props.match;
                    const title = `React Typescript Admin Starter Template-${name}`;

                    Object.keys(params).forEach((key: string) => {
                      params[key] = params[key] && params[key].replace(reg, '');
                    });

                    props.match.params = { ...params };

                    const mergeProps = {
                      app,
                      ...props,
                      query: queryParams ? queryString.parse(queryParams[0]) : {},
                    };

                    return this.requireLogin(
                      <DocumentTitle title={title}>
                        <Component {...mergeProps} />
                      </DocumentTitle>,
                      config.auth
                    );
                  }}
                />
              );
            };

            return config.component ? route(config) :
              config.children && config.children.map((d: RouteConfig) => route(d));
          })
        )}
        <Route path="/app/exception/403" component={NoPermission} />
        <Route path="/app/exception/404" component={NotFound} />
        <Route path="/app/exception/500" component={ServerError} />
        <Route render={() => <Redirect to="/app/exception/404" />} />
      </Switch>
    );
  }
}
