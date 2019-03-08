export { default as Global } from './global';
export { default as Dashboard } from './dashboard';

import { DvaInstance, Model } from 'dva';

// 动态注册 model 并缓存已注册过的 model
const cached = {};

export function registerModel(app: DvaInstance, model: Model) {
    if (!cached[model.namespace]) {
        app.model(model);
        cached[model.namespace] = 1;
    }
}
