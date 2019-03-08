import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';

import { ServerEnv } from '../env';

const serverEnv = ServerEnv();

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
    baseURL: serverEnv.api + '/api',
    timeout: 10000,
    retry: 4,
    retryDelay: 1000,
    headers: {
        Authorization: serverEnv.token,
    },
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
export const GET = (url: string, params?: any) => {
    return new Promise((resolve, reject) => {
        AxiosInstance.get(url, { params }).then((res: AxiosResponse) => {
            let pagination = {};
            if (res.headers && res.headers['x-pagination-total-count']) {
                const {
                    'x-pagination-total-count': totalCount,
                    'x-pagination-page-count': totalPageCount,
                    'x-pagination-page-number': page,
                    'x-pagination-page-size': pageSize,
                } = res.headers;

                pagination = {
                    page: Number(page),
                    pageSize: Number(pageSize),
                    totalCount: Number(totalCount),
                    totalPageCount: Number(totalPageCount),
                };
            }
            resolve({...res, pagination});
        }).catch((error: Error) => reject(error));
    });
};

// DELETE 删除数据
export const DELETE = (url: string, params?: any) => {
    return new Promise((resolve, reject) => {
        AxiosInstance.delete(url, { params })
            .then((res: AxiosResponse) => resolve(res))
            .catch((error: Error) => reject(error));
    });
};

// POST 提交数据
export const POST = (url: string, data?: any, params?: any) => {
    return new Promise((resolve, reject) => {
        AxiosInstance.post(url, data, { params })
            .then((res: AxiosResponse) => resolve(res))
            .catch((error: Error) => reject(error));
    });
};

// PATCH 修改数据
export const PATCH = (url: string, data?: any, params?: any) => {
    return new Promise((resolve, reject) => {
        AxiosInstance.patch(url, data, { params })
        .then((res: AxiosResponse) => resolve(res))
        .catch((error: Error) => reject(error));
    });
};
