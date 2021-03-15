import { Redirect, Route, RouteComponentProps, Switch } from 'dva/router';
import queryString from 'query-string';
import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';

import { ServerEnv } from '../env';
import { Auth } from '../models/typed';
import AllPages, { PublicPages } from '../pages';
import { UrlQueryReg } from '../utils/regTool';
import { RouteConfig } from './config';
import { Routes } from './routes';
import RouteWithSubRoutes from './RouteWithSubRoutes';

const env = ServerEnv();
const { NoPermission, NotFound, ServerError } = PublicPages;

interface InternalProps {
  app: any;
  auth: Auth;
  menu: RouteConfig[];
}

class AppRoutes extends Component<InternalProps> {
  private constructor(props: InternalProps) {
    super(props);
  }

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

    if (!isAuthenticated || !permissions) {
      // 判断是否登录
      return <Redirect to={Routes.Login} key={Routes.Login} />;
    }

    return permission ? this.requireAuth(permission, component) : component;
  }

  public renderRoute(route: RouteConfig): any {
    if (route.component && route.children) {
      return this.requireLogin(<RouteWithSubRoutes app={this.props.app} {...route} />);
    }

    if (route.children) {
      return route.children.map((item) => this.renderRoute(item));
    }

    return this.renderComponent(route);
  }

  public renderComponent(config: RouteConfig) {
    const { app } = this.props;
    const { path, component, name } = config;
    const Component = component ? AllPages[component] : null;

    return (
      Component && (
        <Route
          exact
          key={path}
          path={path}
          render={(props: RouteComponentProps<any>) => {
            // 匹配 location query 字段
            const queryParams = window.location.hash.match(UrlQueryReg);
            const { params } = props.match;
            const title = `${env.name !== '' ? env.name + '-' : ''} React Typescript Admin Starter Template--${name}`;

            Object.keys(params).forEach((key: string) => {
              params[key] = params[key] && params[key].replace(UrlQueryReg, '');
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
      )
    );
  }

  public render() {
    const { menu } = this.props;

    return (
      <Switch>
        {menu.map((config: RouteConfig) => this.renderRoute(config))}
        <Route path={Routes.AppNoPermission} component={NoPermission} />
        <Route path={Routes.AppNotFound} component={NotFound} />
        <Route path={Routes.AppServerError} component={ServerError} />
        <Route render={() => <Redirect to={Routes.AppNotFound} />} />
      </Switch>
    );
  }
}

export default AppRoutes;
