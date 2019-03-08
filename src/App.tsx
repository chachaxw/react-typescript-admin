import './App.css';

import { Layout } from 'antd';
import { connect } from 'dva';
import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';

import { Content, Footer, Header, SideBar } from './components';
import { Auth } from './models/global';
import AppRoutes from './routes';
import routesConfig from './routes/config';
import { getFlatMenuKeys } from './utils/utils';

interface DvaProps {
    auth: Auth;
    location: Location;
    collapsed: boolean;
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

    public onRouterChange(title: string) {
        if (this.state.title === title) {
            return;
        }

        this.setState({ title });
    }

    public render() {
        const { title } = this.state;
        const { app, auth, collapsed, location } = this.props;

        return (
            <DocumentTitle title={title}>
                <Layout className="App">
                    <SideBar collapsed={collapsed} menu={this.menu}
                        flatMenuKeys={this.flatMenuKeys} location={location} />
                    <Layout>
                        <Header />
                        <Content>
                            <AppRoutes app={app} auth={auth}
                                onRouterChange={(title: string) => this.onRouterChange(title)} />
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

export default connect(mapStateToProps)(App);
