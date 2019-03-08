export enum EnvType {
    Development = 'development',
    Staging = 'staging',
    Production = 'production',
    Local = 'local',
    Test = 'test',
}

interface ServerConfig {
    host: string;
    api: string;
    token: string;
    appId: string;
}

const serverEnvironments: {
    test: ServerConfig,
    local: ServerConfig,
    development: ServerConfig,
    staging: ServerConfig,
    production: ServerConfig
} = {
    [EnvType.Local]: {
        host: 'http://localhost:3000',
        api: 'http://localhost:3001',
        appId: 'wx5bf7521877095734',
        token: 'Bearer eyJhbGciOiJIUzI1NiIsImNhbGciOiJHWklQIn0.H4sIAAAAAAAAAFXMQQqDMBBG4bvMOgOOmUji' +
            'FTxFMvkL6aJII7VFvLvtstvHxzuo9U4z3feNO56vZiBHLW80SxCJkw7RO8J7_QX1Osrgg6NHuf2LvLYFn-9JUs0Rv' +
            'rKhBFbFxNnSyBWarEQrFULnBWPus9N4AAAA.ziRA3yyD0E-IKlv7Ry-UN685J7s3RIDAZqZlnm-AczQ',
    },
    [EnvType.Test]: {
        host: 'http://localhost:3000',
        api: 'http://localhost:3001',
        appId: 'wx5bf7521877095734',
        token: 'Bearer eyJhbGciOiJIUzI1NiIsImNhbGciOiJHWklQIn0.H4sIAAAAAAAAAFXMQQqDMBBG4bvMOgOOmUji' +
            'FTxFMvkL6aJII7VFvLvtstvHxzuo9U4z3feNO56vZiBHLW80SxCJkw7RO8J7_QX1Osrgg6NHuf2LvLYFn-9JUs0Rv' +
            'rKhBFbFxNnSyBWarEQrFULnBWPus9N4AAAA.ziRA3yyD0E-IKlv7Ry-UN685J7s3RIDAZqZlnm-AczQ',
    },
    [EnvType.Development]: {
        host: 'https://development.console.ctirobot.com',
        api: 'https://development.api.ctirobot.com',
        appId: 'wx5bf7521877095734',
        token: 'Bearer eyJhbGciOiJIUzI1NiIsImNhbGciOiJHWklQIn0.H4sIAAAAAAAAAFXMQQqDMBBG4bvMOgOOmUji' +
            'FTxFMvkL6aJII7VFvLvtstvHxzuo9U4z3feNO56vZiBHLW80SxCJkw7RO8J7_QX1Osrgg6NHuf2LvLYFn-9JUs0Rv' +
            'rKhBFbFxNnSyBWarEQrFULnBWPus9N4AAAA.ziRA3yyD0E-IKlv7Ry-UN685J7s3RIDAZqZlnm-AczQ',
    },
    [EnvType.Staging]: {
        host: 'https://staging.console.ctirobot.com',
        api: 'https://staging.api.ctirobot.com',
        appId: 'wxbf1e0a6af9752a12',
        token: 'Bearer eyJhbGciOiJIUzI1NiIsImNhbGciOiJHWklQIn0.H4sIAAAAAAAAAFXMQQqDMBBG4bvMOgOOmUji' +
            'FTxFMvkL6aJII7VFvLvtstvHxzuo9U4z3feNO56vZiBHLW80SxCJkw7RO8J7_QX1Osrgg6NHuf2LvLYFn-9JUs0Rv' +
            'rKhBFbFxNnSyBWarEQrFULnBWPus9N4AAAA.ziRA3yyD0E-IKlv7Ry-UN685J7s3RIDAZqZlnm-AczQ',
    },
    [EnvType.Production]: {
        host: 'https://console.ctirobot.com',
        api: 'https://api.ctirobot.com',
        appId: 'wxa67b0c408c10db60',
        token: 'Bearer eyJhbGciOiJIUzI1NiIsImNhbGciOiJHWklQIn0.H4sIAAAAAAAAAFXMQQqDMBBG4bvMOgOOmUji' +
            'FTxFMvkL6aJII7VFvLvtstvHxzuo9U4z3feNO56vZiBHLW80SxCJkw7RO8J7_QX1Osrgg6NHuf2LvLYFn-9JUs0Rv' +
            'rKhBFbFxNnSyBWarEQrFULnBWPus9N4AAAA.ziRA3yyD0E-IKlv7Ry-UN685J7s3RIDAZqZlnm-AczQ',
    },
};

// Node process env variable
export const Env: EnvType = process.env.NODE_ENV as EnvType;

// Server env variables function
export const ServerEnv = () => {

    if (process.env.REACT_APP_BUILD === EnvType.Staging) { // For staging production build
        return serverEnvironments[EnvType.Staging];
    }

    return serverEnvironments[Env];
};
