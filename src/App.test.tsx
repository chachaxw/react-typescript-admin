import dva from 'dva';
import { StaticRouter } from 'dva/router';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';

import App from './App';
import { Global } from './models';

let app: any;
let wrapper: any;

beforeAll(() => {
    app = dva();
    app.model(Global);
    app.router(() => ({}));
    app.start();
    wrapper = shallow(
        <StaticRouter context={{}}>
            <App store={app._store} location={{pathname: '/app/dashboard'}} />
        </StaticRouter>
    );
});

afterAll(() => {
    wrapper.unmount();
});

describe('App Test', () => {
    it('Capturing Snapshot of APP', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
