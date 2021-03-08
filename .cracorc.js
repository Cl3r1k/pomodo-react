const CracoAlias = require('craco-alias');
const path = require('path');

module.exports = {
  webpack: {
    configure: webpackConfig => {
      const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
        ({ constructor }) =>
          constructor && constructor.name === 'ModuleScopePlugin'
      );

      console.info(
        'webpackConfig.resolve.plugins :',
        webpackConfig.resolve.plugins
      );

      // webpackConfig.resolve.plugins[scopePluginIndex].allowedFiles.add(path.resolve("./config.json"));

      // console.info('after add to Set() webpackConfig.resolve.allowedFiles :', webpackConfig.resolve.plugins);

      webpackConfig.resolve.plugins[scopePluginIndex].appSrcs.push(
        path.resolve('./config')
      );

      console.info(
        'after push to [] webpackConfig.resolve.plugins.appSrcs :',
        webpackConfig.resolve.plugins
      );

      console.info('after webpackConfig.resolve :', webpackConfig.resolve);

      // webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);

      // console.info('after splice webpackConfig.resolve.plugins :', webpackConfig.resolve.plugins);

      return webpackConfig;
    },
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        // baseUrl SHOULD be specified
        // plugin does not take it from tsconfig
        baseUrl: '.',
        // tsConfigPath should point to the file where "baseUrl" and "paths" are specified
        tsConfigPath: './tsconfig.extend.json',
      },
    },
  ],
};
