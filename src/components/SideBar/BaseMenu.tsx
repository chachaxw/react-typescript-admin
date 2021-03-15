import { Icon } from '@ant-design/compatible';
import { Menu } from 'antd';
import { Link } from 'dva/router';
import React, { PureComponent } from 'react';

import { getMenuMatches, urlToList } from '../../utils/utils';

const { SubMenu, Item } = Menu;

export interface MenuItemProps {
  name: string;
  icon?: string;
  path: string;
  children?: any;
  hideInMenu?: boolean;
}

interface InternalProps {
  location: Location;
  menu: MenuItemProps[];
  collapsed: boolean;
  className?: string;
  openKeys: string[];
  flatMenuKeys: string[];
  theme?: 'dark' | 'light';
  mode?: 'inline' | 'vertical' | 'horizontal';
  onOpenChange: any;
}

class BaseMenu extends PureComponent<InternalProps> {
  private constructor(props: InternalProps) {
    super(props);
  }

  public getSelectedMenuKeys(pathname: string) {
    const { flatMenuKeys } = this.props;
    return urlToList(pathname).map((path: string) => getMenuMatches(flatMenuKeys, path).pop()) as string[];
  }

  public renderMenuItem(item: MenuItemProps) {
    const { path, icon, name, hideInMenu } = item;

    if (hideInMenu) {
      return;
    }

    return (
      <Item key={path}>
        <Link to={path}>
          {icon && <Icon type={icon} />}
          <span>{name}</span>
        </Link>
      </Item>
    );
  }

  public renderSubMenu(props: MenuItemProps) {
    const { name, icon, path, children } = props;

    return (
      <SubMenu
        key={path}
        title={
          icon ? (
            <span>
              <Icon type={icon} />
              <span>{name}</span>
            </span>
          ) : (
            name
          )
        }
      >
        {children && children.length
          ? children.map((item: MenuItemProps) =>
              item.children ? this.renderSubMenu(item) : this.renderMenuItem(item)
            )
          : null}
      </SubMenu>
    );
  }

  public render() {
    const { className, collapsed, theme, openKeys, mode, menu, onOpenChange, location } = this.props;

    let selectedKeys = this.getSelectedMenuKeys(location.pathname);
    if (!selectedKeys.length && openKeys) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }

    let props = {};
    if (openKeys && !collapsed) {
      props = {
        openKeys: openKeys.length === 0 ? [...selectedKeys] : openKeys,
      };
    }

    return (
      <Menu
        key="Menu"
        className={className}
        theme={theme || 'dark'}
        mode={mode || 'inline'}
        selectedKeys={selectedKeys}
        forceSubMenuRender={true}
        onOpenChange={onOpenChange}
        {...props}
      >
        {menu &&
          menu.length &&
          menu.map((item: MenuItemProps, index: number) =>
            item.children ? this.renderSubMenu(item) : this.renderMenuItem(item)
          )}
      </Menu>
    );
  }
}

export default BaseMenu;
