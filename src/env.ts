export enum EnvType {
  Development = 'development',
  Production = 'production',
  Local = 'local',
  Test = 'test',
}

interface ServerConfig {
  host: string;
  api: string;
  name: string;
}

const serverEnvironments: {
  test: ServerConfig;
  local: ServerConfig;
  development: ServerConfig;
  production: ServerConfig;
} = {
  [EnvType.Local]: {
    name: 'Local',
    host: 'http://localhost:3000',
    api: 'http://localhost:3031',
  },
  [EnvType.Test]: {
    name: 'Test',
    host: 'http://localhost:3000',
    api: 'http://localhost:3031',
  },
  [EnvType.Development]: {
    name: 'Development',
    host: 'http://localhost:3000',
    api: 'http://localhost:3031',
  },
  [EnvType.Production]: {
    name: '',
    host: 'https://chachaxw.github.io',
    api: 'https://chachaxw.github.io',
  },
};

// Node process env variable
export const Env: EnvType = process.env.NODE_ENV as EnvType;

// Node process.env.REACT_APP_BUILD
export const BuildEnv: EnvType = process.env.REACT_APP_BUILD as EnvType;

// Env 是否为开发环境
export const __DEV__: boolean = Env === EnvType.Development || BuildEnv === EnvType.Development;

// Env 是否为测试环境
export const __TEST__: boolean = BuildEnv === EnvType.Test;

// Env 是否为生产环境
export const __PROD__: boolean = Env === EnvType.Production;

// 获取服务端环境变量函数
export const ServerEnv = (): ServerConfig => {
  if (process.env.REACT_APP_BUILD === EnvType.Test) {
    // For staging build
    return serverEnvironments[EnvType.Test];
  }

  if (process.env.REACT_APP_BUILD === EnvType.Development) {
    // For development build
    return serverEnvironments[EnvType.Development];
  }
  return serverEnvironments[Env];
};
