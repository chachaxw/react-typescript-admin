/* config-overrides.js */
const { override, fixBabelImports } = require('customize-cra');
const reactHotLoader = require('react-app-rewire-hot-loader');

// Webpack 默认配置覆盖操作，慎改!!!
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
  // React hot loader
  reactHotLoader,
);
