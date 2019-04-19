import { notification } from 'antd';
import { routerRedux } from 'dva/router';

import { codeMessage } from './constant';

export const errorHandle = (error: any, dispatch: any) => {
  const { response } = error;
  const { status, data } = response;
  const errorText = codeMessage[status] || data.error;

  if (status === 401) {
    notification.error({
      message: errorText,
    });
    // TODO: need to add redirect to login page
    // dispatch({type: 'global/logout'});
    return;
  }

  notification.error({
    message: `请求错误 ${status}`,
    description: errorText,
  });

  if (status === 403) {
    dispatch(routerRedux.push('/app/exception/403'));
    return;
  }

  if (status <= 504 && status >= 500) {
    dispatch(routerRedux.push('/app/exception/500'));
    return;
  }

  if (status >= 404 && status < 422) {
    dispatch(routerRedux.push('/app/exception/404'));
  }
};
