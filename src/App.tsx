import './App.css';

import { Layout } from 'antd';
import { connect } from 'dva';
import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';

import { Content, ErrorBoundary, Footer, Header, SideBar } from './components';
import { Auth } from './models/global';
import AppRoutes from './routes';
import routesConfig from './routes/config';
import { getFlatMenuKeys } from './utils/utils';

interface DvaProps {
  auth: Auth;
  location: Location;
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

interface InternalProps extends DvaProps {
  app: any;
}

interface InternalState {
  title: string;
}

class App extends Component<InternalProps, InternalState> {
  private menu = routesConfig.app;
  private flatMenuKeys = getFlatMenuKeys(this.menu);

  private constructor(props: InternalProps) {
    super(props);
    this.state = {
      title: '',
    };
  }

  public render() {
    const { title } = this.state;
    const { app, auth, collapsed, location, onCollapse } = this.props;

    return (
      <DocumentTitle title={title}>
        <Layout className="App">
          <SideBar collapsed={collapsed} menu={this.menu} onCollapse={onCollapse}
            flatMenuKeys={this.flatMenuKeys} location={location} />
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
      </DocumentTitle>
    );
  }
}

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
