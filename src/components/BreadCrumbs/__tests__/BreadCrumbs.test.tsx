import { render } from '@testing-library/react';
import { StaticRouter } from 'dva/router';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';

import { appRoutes, Routes } from '../../../routes';
import BreadCrumbs, { DefaultItem } from '../BreadCrumbs';

describe('DefaultItem test', () => {
  it('should display a text when without prop component', () => {
    const tree = shallow(<DefaultItem path={Routes.Dashboard} name="Dashboard" />);
    const props = tree.props();

    expect(props.children).toEqual('Dashboard');
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should display a link when with prop component', () => {
    const tree = shallow(
      <StaticRouter context={{}}>
        <DefaultItem path={Routes.Dashboard} name="Dashboard" component="Test" />
      </StaticRouter>
    );
    const { getByText } = render(
      <StaticRouter context={{}}>
        <DefaultItem path={Routes.Dashboard} name="Dashboard" component="Test" />
      </StaticRouter>
    );
    const link = getByText('Dashboard');

    expect(link.nodeName).toBe('A');
    expect(link.href).toBe('http://localhost/app/dashboard');
    expect(toJson(tree)).toMatchSnapshot();
  });
});

describe('BreadCrumbs test', () => {
  it('should display a breadcrumbs', () => {
    const tree = shallow(<BreadCrumbs menu={appRoutes.app} url={Routes.Dashboard} />);
    const props = tree.props();

    expect(props.children.length).toEqual(1);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
