import { Route, RouteComponentProps } from 'dva/router';
import queryString from 'query-string';
import React, { FC } from 'react';
import DocumentTitle from 'react-document-title';

import { ServerEnv } from '../env';
import AllPages, { PublicPages } from '../pages';
import { RouteConfig } from './config';

const env = ServerEnv();
const { NotFound } = PublicPages;

interface Props extends RouteConfig {
  app: any;
}

export const RouteWithSubRoutes: FC<Props> = (route) => {
  const { path, name, app, children, auth, component } = route;
  const Component = component ? AllPages[component] : null;

  return (
    <Route
      path={path}
      render={(props: RouteComponentProps<any>) => {
        // Match location query string
        const reg = /\?\S*/g;
        const queryParams = window.location.href.match(reg);
        const { params } = props.match;
        const title = `${env.name !== '' ? env.name + '-' : ''} React Typescript Admin Starter Template-${name}`;

        Object.keys(params).forEach((key: string) => {
          params[key] = params[key] && params[key].replace(reg, '');
        });

        props.match.params = { ...params };

        const mergeProps = {
          app,
          auth,
          ...props,
          query: queryParams ? queryString.parse(queryParams[0]) : {},
        };

        return Component ? (
          <DocumentTitle title={title}>
            <Component {...mergeProps} routes={children} />
          </DocumentTitle>
        ) : (
          <NotFound />
        );
      }}
    />
  );
};

export default RouteWithSubRoutes;
