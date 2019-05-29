export enum EnvType {
  Development = 'development',
  Production = 'production',
  Local = 'local',
  Test = 'test',
}

interface ServerConfig {
  host: string;
  api: string;
}

const serverEnvironments: {
  test: ServerConfig,
  local: ServerConfig,
  development: ServerConfig,
  production: ServerConfig
} = {
  [EnvType.Local]: {
    host: 'http://localhost:3000',
    api: 'http://localhost:3031',
  },
  [EnvType.Test]: {
    host: 'http://localhost:3000',
    api: 'http://localhost:3031',
  },
  [EnvType.Development]: {
    host: 'http://localhost:3000',
    api: 'http://localhost:3031',
  },
  [EnvType.Production]: {
    host: 'https://chachaxw.github.io',
    api: 'https://chachaxw.github.io',
  },
};

// Node process env variable
export const Env: EnvType = process.env.NODE_ENV as EnvType;

// Server env variables function
export const ServerEnv = serverEnvironments[Env];
