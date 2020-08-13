import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';

import { ServerEnv } from '../env';

const env = ServerEnv();

export interface Pagination {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPageCount: number;
}

interface CustomizeConfig extends AxiosRequestConfig {
  retry: number;
  retryDelay: number;
}

// axios config options
const options: CustomizeConfig = {
  retry: 1,
  timeout: 10000,
  retryDelay: 1000,
  baseURL: env.api + '/api',
  // 查询对象序列化函数
  paramsSerializer: (params: any) => qs.stringify(params),
};

const AxiosInstance = axios.create(options);

// 设置请求重试机制
AxiosInstance.interceptors.response.use(undefined, (err) => {
  const config = err.config;

  if (!config || !config.retry) {
    return Promise.reject(err);
  }

  config.__retryCount = config.__retryCount || 0;
  if (config.__retryCount >= config.retry) {
    return Promise.reject(err);
  }

  config.__retryCount += 1;
  return new Promise((resolve) => {
    setTimeout(() => resolve(), config.retryDelay);
  }).then(() => axios(config));
});

// GET 获取数据
export const GET = (url: string, params?: any, config?: AxiosRequestConfig) => {
  return new Promise((resolve, reject) => {
    AxiosInstance.get(url, { params, ...config })
      .then((res: AxiosResponse) => {
        resolve(res);
      })
      .catch((error: any) => reject(error));
  });
};

// POST 提交数据
export const POST = (url: string, data?: any, config?: AxiosRequestConfig) => {
  return new Promise((resolve, reject) => {
    AxiosInstance.post(url, data, config)
      .then((res: AxiosResponse) => resolve(res))
      .catch((error: any) => reject(error));
  });
};

// PATCH 修改数据
export const PATCH = (url: string, data?: any, config?: AxiosRequestConfig) => {
  return new Promise((resolve, reject) => {
    AxiosInstance.patch(url, data, config)
      .then((res: AxiosResponse) => resolve(res))
      .catch((error: any) => reject(error));
  });
};

// DELETE 删除数据
export const DELETE = (url: string, config?: AxiosRequestConfig) => {
  return new Promise((resolve, reject) => {
    AxiosInstance.delete(url, config)
      .then((res: AxiosResponse) => resolve(res))
      .catch((error: any) => reject(error));
  });
};

export default AxiosInstance;
