import { Breadcrumb, Typography } from 'antd';
import { Link } from 'dva/router';
import React, { FC } from 'react';

import { RouteConfig } from '../../routes';
import { getBreadcrumbNameMap, urlToList } from '../../utils/utils';

const { Item } = Breadcrumb;
const { Text } = Typography;

// 渲染 Breadcrumb 子节点
// Render the Breadcrumb child node
interface DefaultItemProps {
  path: string;
  name: string;
  component?: string;
}

export const DefaultItem: FC<DefaultItemProps> = (props) => {
  const { path, component, name } = props;
  return component ? <Link to={path}>{name}</Link> : <Text>{name}</Text>;
};

interface Props {
  url: string;
  menu: RouteConfig[];
}

export const BreadCrumbs: FC<Props> = (props) => {
  const { url, menu } = props;
  const urlList = urlToList(url);
  const breadCrumbsMap = getBreadcrumbNameMap(menu);
  const breadCrumbs = urlList.map((item: string) => breadCrumbsMap[item]).filter((item) => item && item);

  if (!(breadCrumbs && breadCrumbs.length)) {
    return null;
  }

  return (
    <Breadcrumb style={{ margin: '12px 16px' }}>
      {breadCrumbs.map((item: RouteConfig) => (
        <Item key={item.path}>
          <DefaultItem path={item.path} name={item.name} component={item.component} />
        </Item>
      ))}
    </Breadcrumb>
  );
};

export default BreadCrumbs;
