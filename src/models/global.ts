// Global declare
declare global {
  interface Window { ga: any; }
}

// Global auth interface
export interface Auth {
  isAuthenticated: boolean;
  permissions: string[];
}

// Global userInfo interface
export interface UserInfo {
  name: string;
  mobile: string;
  avatarUrl: string;
  nickname: string;
}

// Global state interface
export interface GlobalState {
  auth: Auth;
  collapsed: boolean;
  notices: any[];
  userInfo: UserInfo;
}

export default {
  namespace: 'global', // model的命名空间

  state: { // 应用的状态数据
    auth: {
      isAuthenticated: true,
      permissions: [],
    },
    userInfo: {
      name: '',
      mobile: '',
      avatarUrl: '',
      nickname: '',
    },
    collapsed: false,
    notices: [],
    hasMore: false,
  },

  effects: { // 异步请求处理和业务逻辑操作

  },

  reducers: { // Redux reducers
    changeLayoutCollapsed(state: GlobalState, { payload }: any) {
      return { ...state, collapsed: payload };
    },

    loadUserInfo(state: GlobalState, { payload }: any) {
      return { ...state, userInfo: payload };
    },

    loadNotices(state: GlobalState, { payload, hasMore }: any) {
      return { ...state, notices: payload, hasMore };
    },
  },

  subscriptions: { // 用于订阅一个数据源, 然后根据需要 dispatch 相应的 action
    setup({ dispatch, history }: any) {
      // TODO: Need to add auth and permissions
      return history.listen(({ pathname, search }: Location) => {
        if (typeof window.ga !== 'undefined') {
          // TODO: Google Analytics config, 埋点配置
          window.ga('send', 'PageView', pathname + search);
        }
      });
    },
  },
};
