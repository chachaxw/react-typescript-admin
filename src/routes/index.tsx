import { Redirect, Route, RouteComponentProps, Switch } from 'dva/router';
import React, { Component } from 'react';
import routesConfig, { RouteConfig } from './config';

import queryString from 'query-string';
import { Auth } from '../models/global';
import AllPages from '../pages';

interface InternalProps {
  app: any;
  auth: Auth;
  onRouterChange: (title: string) => void;
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
    const { app, onRouterChange } = this.props;

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

                    Object.keys(params).forEach((key: string) => {
                      params[key] = params[key] && params[key].replace(reg, '');
                    });

                    props.match.params = { ...params };

                    const mergeProps = {
                      app,
                      ...props,
                      query: queryParams ? queryString.parse(queryParams[0]) : {},
                    };

                    if (onRouterChange) {
                      onRouterChange && onRouterChange(`React Typescript Admin Starter Template-${name}`);
                    }

                    return this.requireLogin(<Component {...mergeProps} />, config.auth);
                  }}
                />
              );
            };

            return config.component ? route(config) :
                    config.children && config.children.map((d: RouteConfig) => route(d));
          })
        )}
        <Route render={() => <Redirect to="/exception/404" />} />
      </Switch>
    );
  }
}
