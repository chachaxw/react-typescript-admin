import { Icon, Menu } from 'antd';
import React, { FC, PureComponent } from 'react';
import { getMenuMatches, urlToList } from '../../utils/utils';

import { Link } from 'dva/router';

const { SubMenu, Item } = Menu;

export interface MenuItemProps {
  name: string;
  icon?: string;
  path: string;
  children?: any;
  hideInMenu?: boolean;
}

const MenuItem: FC<MenuItemProps> = (props) => {
  const { path, icon, name, hideInMenu, ...restProps } = props;

  if (hideInMenu) {
    return null;
  }

  return (
    <Item key={path} {...restProps}>
      <Link to={path}>
        {icon && <Icon type={icon} />}
        <span>{name}</span>
      </Link>
    </Item>
  );
};

const SubMenuGroup: FC<MenuItemProps> = (props) => {
  const { name, icon, path, hideInMenu, children, ...restProps } = props;

  if (hideInMenu) {
    return null;
  }

  return (
    <SubMenu
      key={path}
      {...restProps}
      title={
        icon ? (
          <span>
            <Icon type={icon} />
            <span>{name}</span>
          </span>
        ) : name
      }
    >
      {children && children.length ? children.map((item: MenuItemProps) => {
        return item.children ? <SubMenuGroup key={item.path} {...item} /> :
          <MenuItem key={item.path} {...item} />;
      }) : null}
    </SubMenu>
  );
};

interface InternalProps {
  location: Location;
  menu: MenuItemProps[];
  style?: object;
  collapsed: boolean;
  className?: string;
  flatMenuKeys: string[];
  theme?: 'dark' | 'light';
  mode?: 'inline' | 'vertical' | 'horizontal';
  openKeys: string[];
  onOpenChange: (openKeys: string[]) => void;
  handleOpenChange: (openKeys: string[]) => void;
}

class BaseMenu extends PureComponent<InternalProps> {

  private constructor(props: InternalProps) {
    super(props);
  }

  public getSelectedMenuKeys(pathname: string) {
    const { flatMenuKeys } = this.props;
    return urlToList(pathname).map((path: string) => getMenuMatches(flatMenuKeys, path).pop()) as string[];
  }

  public render() {
    const { className, collapsed, theme, openKeys, mode,
      style, menu, handleOpenChange, location } = this.props;

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
        style={style}
        className={className}
        theme={theme || 'dark'}
        mode={mode || 'inline'}
        selectedKeys={selectedKeys}
        onOpenChange={handleOpenChange}
        {...props}
      >
        {menu && menu.length && menu.map((item: MenuItemProps, index: number) => (
          item.children ? <SubMenuGroup key={index} {...item} /> : <MenuItem key={index} {...item} />
        ))}
      </Menu>
    );
  }
}

export default BaseMenu;
