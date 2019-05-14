const path = require('path');
const version = process.env.VERSION || require('../package.json').version;
const env = process.env.NODE_ENV || 'development';
const target = process.env.TARGET || 'spa';
const analyzer = process.env.ANALYZER;
const mock = process.env.MOCK;
const https = process.env.HTTPS;

const environment = {
  env,
  target,
  version,
  isEnvProduction: env !== 'development',
  isAnalyzerEnable: !!analyzer,
  isMockEnable: !!mock,
  isHttpsEnable: !!https,
  useEslint: false,
  publicPath: './',
  destPath: target === 'githubpages' ? path.resolve(__dirname, '../', 'docs') : path.resolve(__dirname, '../', 'dist'),
  proxy: require('./proxy.js')
};

module.exports = environment;
