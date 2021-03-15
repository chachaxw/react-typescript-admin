import { Layout } from 'antd';
import React, { PureComponent } from 'react';

import { getDefaultCollapsedSubMenus } from '../../utils/utils';
import BaseMenu, { MenuItemProps } from './BaseMenu';
import Logo from './Logo';
import styles from './SideBar.module.scss';

let firstMount = true;
const { Sider } = Layout;

interface InternalProps {
  collapsed: boolean;
  location: Location;
  width?: number | string;
  menu: MenuItemProps[];
  flatMenuKeys: string[];
  onCollapse: (collapsed: boolean) => void;
}

interface InternalState {
  openKeys: string[];
  pathname: string;
  flatMenuKeysLen: number;
}

class SideBar extends PureComponent<InternalProps, InternalState> {
  private constructor(props: InternalProps) {
    super(props);

    this.handleOpenChange = this.handleOpenChange.bind(this);
    this.state = {
      openKeys: [],
      pathname: '/',
      flatMenuKeysLen: 0,
    };
  }

  private static getDerivedStateFromProps(props: InternalProps, state: InternalState) {
    const { pathname, flatMenuKeysLen } = state;
    const { location, flatMenuKeys } = props;

    if (location.pathname !== pathname || flatMenuKeys.length !== flatMenuKeysLen) {
      return {
        pathname: location.pathname,
        flatMenuKeysLen: flatMenuKeys.length,
        openKeys: getDefaultCollapsedSubMenus(location.pathname, flatMenuKeys),
      };
    }
    return null;
  }

  public componentDidMount() {
    firstMount = false;
  }

  public isMainMenu(key: string): boolean {
    const { menu } = this.props;
    return menu.some((item: MenuItemProps) => {
      if (!key) {
        return false;
      }
      return item.path === key;
    });
  }

  public handleOpenChange(openKeys: string[]) {
    this.setState({ openKeys });
  }

  public render() {
    const { openKeys } = this.state;
    const { menu, flatMenuKeys, location, width, collapsed, onCollapse } = this.props;
    return (
      <Sider
        collapsible
        width={width || 240}
        collapsed={collapsed}
        className={styles.sideBar}
        onCollapse={() => {
          if (!firstMount) {
            onCollapse(!collapsed);
          }
        }}
      >
        <Logo />
        <BaseMenu
          menu={menu}
          openKeys={openKeys}
          location={location}
          collapsed={collapsed}
          className={styles.baseMenu}
          flatMenuKeys={flatMenuKeys}
          onOpenChange={this.handleOpenChange}
        />
      </Sider>
    );
  }
}

export default SideBar;
