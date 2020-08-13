import { Layout } from 'antd';
import { connect } from 'dva';
import React, { FC } from 'react';

import { BreadCrumbs, Content, ErrorBoundary, Footer, Header, SideBar } from './components';
import { Auth } from './models/global';
import { AppRoutes } from './routes';
import { appRoutes } from './routes/config';
import { getFlatMenuKeys } from './utils/utils';

import './App.css';

const menu = appRoutes.app;
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
      <SideBar
        menu={menu}
        location={location}
        collapsed={collapsed}
        onCollapse={onCollapse}
        flatMenuKeys={flatMenuKeys}
      />
      <Layout>
        <Header />
        <Content>
          <BreadCrumbs menu={menu} url={location.pathname} />
          <ErrorBoundary>
            <AppRoutes menu={menu} app={app} auth={auth} />
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
