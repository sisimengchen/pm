const { isEnvProduction, isMockEnable, isHttpsEnable, proxy } = require('./environment');
const { ip } = require('./utils');

module.exports = isEnvProduction
  ? {}
  : {
    before: (app) => {
      isMockEnable && require('./mock')(app);
    },
    https: isHttpsEnable,
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    host: ip(),
    port: 8080,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    publicPath: '/',
    // proxy: proxy ? proxy : false,
    proxy: {
      '/api': 'http://localhost:3000'
    },
    quiet: false,
    watchOptions: {
      poll: false
    }
  };
