import { routerRedux } from 'dva/router';
import { GlobalService } from '../services/GlobalService';
import { exceptionRoutes, localStorageKey } from '../utils/constant';
import { isEmpty } from '../utils/utils';

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
      isAuthenticated: false,
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
    *login(action: any, { call, put }: any) {
      try {
        const { payload } = action;
        yield call(GlobalService.auth, payload);
        yield put({
          type: 'authorize',
          payload: {
            isAuthenticated: true,
            permissions: [],
          },
        });
        yield put(routerRedux.push('/app'));
      } catch (error) {
        throw error;
      }
    },

    *logout(action: any, { put }: any) {
      yield put({
        type: 'deauthorize',
        payload: {
          isAuthenticated: false,
          permissions: [],
          collapsed: false,
        },
      });
      yield put(routerRedux.push('/login'));
    },
  },

  reducers: { // Redux reducers
    authorize(state: GlobalState, { payload }: any) {
      localStorage.setItem(localStorageKey.APP_KEY_STORE, JSON.stringify(payload));
      return { ...state, auth: payload };
    },

    deauthorize(state: GlobalState, { payload }: any) {
      localStorage.removeItem(localStorageKey.APP_KEY_STORE);
      localStorage.removeItem(localStorageKey.USER_KEY_STORE);
      return { ...state, auth: payload };
    },

    changeLayoutCollapsed(state: GlobalState, { payload }: any) {
      localStorage.setItem(localStorageKey.APP_VIEW_STORE, JSON.stringify({ collapsed: payload }));
      return { ...state, collapsed: payload };
    },

    loadUserInfo(state: GlobalState, { payload }: any) {
      return { ...state, userInfo: payload };
    },

    loadNotices(state: GlobalState, { payload, hasMore }: any) {
      return { ...state, notices: payload, hasMore };
    },

    saveAuthData(state: GlobalState, { payload }: any) {
      localStorage.setItem(localStorageKey.APP_KEY_STORE, JSON.stringify(payload));
      return state;
    },
  },

  subscriptions: { // 用于订阅一个数据源, 然后根据需要 dispatch 相应的 action
    setup({ dispatch, history }: any) {
      return history.listen(({ pathname, search }: Location) => {
        if (exceptionRoutes.includes(pathname)) {
          return;
        }

        const appData = JSON.parse(localStorage.getItem(localStorageKey.APP_KEY_STORE) || '{}');
        const appView = JSON.parse(localStorage.getItem(localStorageKey.APP_VIEW_STORE) || '{}');

        try {
          if (!isEmpty(appData)) {
            dispatch({
              type: 'changeLayoutCollapsed',
              payload: !isEmpty(appView) ? appView.collapsed : false,
            });

            dispatch({
              type: 'authorize',
              payload: appData,
            });

            if (pathname === '/login') {
              dispatch(routerRedux.push('/'));
            }
          } else {
            if (pathname === '/login') {
              return;
            }
          }
        } catch (error) {
          throw error;
        }
      });
    },
  },
};
