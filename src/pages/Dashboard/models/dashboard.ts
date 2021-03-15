// Dashboard state
export default {
  namespace: 'dashboard', // model的命名空间

  state: {
    // 应用的状态数据
  },

  effects: {},

  reducers: {
    // Redux reducers
  },

  subscriptions: {
    setup({ dispatch, history }: any) {
      return history.listen(({ pathname }: any) => {
        if (pathname === '/app/dashboard') {
        }
      });
    },
  },
};
