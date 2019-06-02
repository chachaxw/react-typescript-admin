import './App.css';

import { Layout } from 'antd';
import { connect } from 'dva';
import React, { FC } from 'react';

import { Content, ErrorBoundary, Footer, Header, SideBar } from './components';
import { Auth } from './models/global';
import AppRoutes from './routes';
import routesConfig from './routes/config';
import { getFlatMenuKeys } from './utils/utils';

const menu = routesConfig.app;
const flatMenuKeys = getFlatMenuKeys(menu);

interface DvaProps {
  auth: Auth;
  location: Location;
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

interface Props extends DvaProps {
  app: any;
}

const App: FC<Props> = (props: Props) => {
  const { app, auth, collapsed, location, onCollapse } = props;

  return (
    <Layout className="App">
      <SideBar collapsed={collapsed} menu={menu} onCollapse={onCollapse}
        flatMenuKeys={flatMenuKeys} location={location} />
      <Layout>
        <Header />
        <Content>
          <ErrorBoundary>
            <AppRoutes app={app} auth={auth} />
          </ErrorBoundary>
        </Content>
        <Footer className="Footer" />
      </Layout>
    </Layout>
  );
};

const mapStateToProps = ({ global }: any) => {
  return {
    auth: global.auth,
    collapsed: global.collapsed,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onCollapse: (collapsed: boolean) => {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload: collapsed,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
