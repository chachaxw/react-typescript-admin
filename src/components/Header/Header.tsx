import { Avatar, Badge, Dropdown, Icon, Layout, Menu } from 'antd';
import { connect } from 'dva';
import Debounce from 'lodash-decorators/debounce';
import React, { PureComponent } from 'react';

import { UserInfo } from '../../models/global';
import styles from './Header.module.scss';
import NoticePane from './NoticePane';

const { ItemGroup } = Menu;

interface DvaProps {
  logout: () => void;
  loadMoreNotices: (params?: any) => void;
}

interface InternalProps extends DvaProps {
  notices: any[];
  userInfo: UserInfo;
  collapsed: boolean;
  hasMore: boolean;
  fetchingNotices: boolean;
  onCollapse: (collapsed: boolean) => void;
}

interface InternalState {
  showNoticePane: boolean;
}

export class Header extends PureComponent<InternalProps, InternalState> {
  private isFullScreen = false;

  private constructor(props: InternalProps) {
    super(props);
    this.state = {
      showNoticePane: false,
    };
  }

  public componentWillUnmount() {
    // 移除 window.resize 事件监听
    document.removeEventListener('resize', this.triggerResizeEvent.bind(this));
  }

  @Debounce(500)
  public triggerResizeEvent() {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }

  public setFullScreen() {
    const body = document.getElementsByTagName('body')[0];
    if (!this.isFullScreen) {
      this.isFullScreen = true;
      body.requestFullscreen();
    } else {
      this.isFullScreen = false;
      document.exitFullscreen();
    }
  }

  public signOut() {
    this.props.logout();
  }

  public onVisibleChange(visible: boolean) {
    this.setState({ showNoticePane: visible });
  }

  public renderDropdownMenu(props: UserInfo) {
    return (
      <Menu className={styles.dropdownMenu}>
        <Menu.Item key="hello">你好 - Chacha </Menu.Item>
        <ItemGroup title="设置中心">
          <Menu.Item key="setting:3"><Icon type="user" /> 个人设置</Menu.Item>
          <Menu.Item key="setting:4"><Icon type="setting" /> 系统设置</Menu.Item>
        </ItemGroup>
        <ItemGroup title="用户中心">
          <Menu.Item key="setting:2"><Icon type="profile" /> 个人信息</Menu.Item>
          <Menu.Item key="signOut" onClick={() => this.signOut()}>
            <Icon type="logout" /> 退出登录
          </Menu.Item>
        </ItemGroup>
      </Menu>
    );
  }

  public render() {
    const { showNoticePane } = this.state;
    const { collapsed, hasMore, notices, fetchingNotices,
      loadMoreNotices, onCollapse, userInfo } = this.props;

    return (
      <Layout.Header className={styles.header}>
        <div className={styles.headerIcon} onClick={() => onCollapse(!collapsed)}>
          <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
        </div>
        <div className={styles.headerRight}>
          <div className={styles.headerIcon}>
            <Icon type="search" />
          </div>
          <div className={styles.headerIcon} onClick={() => this.setFullScreen()}>
            <Icon type="arrows-alt" />
          </div>
          <Dropdown visible={showNoticePane}
            onVisibleChange={(visible: boolean) => this.onVisibleChange(visible)}
            overlay={<NoticePane
              notices={notices} loading={fetchingNotices}
              loadMoreNotices={(params: any) => loadMoreNotices(params)} hasMore={hasMore}
              closeNoticePane={(visible: boolean) => this.onVisibleChange(visible)}/>}
          >
            <div className={styles.headerIcon}>
              <Badge count={notices.length}><Icon type="bell" /></Badge>
            </div>
          </Dropdown>
          <Dropdown  overlay={() => this.renderDropdownMenu(userInfo)}>
            <div className={styles.headerIcon}>
              <Avatar size={32} style={{backgroundColor: '#f56a00'}}>C</Avatar>
            </div>
          </Dropdown>
        </div>
      </Layout.Header>
    );
  }
}

const mapStateToProps = ({ global, loading }: any) => {
  return {
    notices: global.notices,
    userInfo: global.userInfo,
    collapsed: global.collapsed,
    hasMore: global.hasMore,
    fetchingNotices: loading.effects['global/fetchNotifications'],
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
    logout: () => {
      dispatch({type: 'global/logout'});
    },
    loadMoreNotices: (params?: any) => {
      dispatch({
        type: 'global/fetchNotifications',
        payload: params,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
