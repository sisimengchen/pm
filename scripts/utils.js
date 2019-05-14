const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { isEnvProduction } = require('./environment');

const resolve = (p = '') => path.resolve(__dirname, '../', p);

const getCssLoaders = (cssOptions = {}) => {
  const loaders = [
    {
      loader: isEnvProduction ? MiniCssExtractPlugin.loader : 'style-loader'
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap: !isEnvProduction,
        ...cssOptions
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        sourceMap: !isEnvProduction
      }
    }
  ];
  return loaders;
};

const getLessLoaders = () => {
  const loaders = getCssLoaders();
  loaders.push({
    loader: 'less-loader',
    options: {
      sourceMap: !isEnvProduction,
      javascriptEnabled: true,
      paths: [
        path.resolve(__dirname, '../', 'node_modules')
      ]
    }
  });
  return loaders;
};

const getScssLoaders = () => {
  const loaders = getCssLoaders();
  loaders.push({
    loader: 'sass-loader',
    options: {
      sourceMap: !isEnvProduction
    }
  });
  return loaders;
};

const getStylusLoaders = () => {
  const loaders = getCssLoaders();
  loaders.push({
    loader: 'stylus-loader',
    options: {
      sourceMap: !isEnvProduction
    }
  });
  return loaders;
};

const ip = () => {
  const os = require('os');
  const interfaces = os.networkInterfaces();
  const family = 'ipv4';
  const isLoopback = addr => /^(::f{4}:)?127\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})/.test(addr) ||
    /^fe80::1$/.test(addr) ||
    /^::1$/.test(addr) ||
    /^::$/.test(addr);
  const all = Object.keys(interfaces)
    .map((nic) => {
      const addresses = interfaces[nic].filter((details) => {
        details.family = details.family.toLowerCase();
        if (details.family !== family || isLoopback(details.address)) {
          return false;
        }
        return true;
      });
      return addresses.length ? addresses[0].address : undefined;
    })
    .filter(Boolean);
  return !all.length ? ip.loopback(family) : all[0];
};

module.exports = {
  resolve,
  getCssLoaders,
  getLessLoaders,
  getScssLoaders,
  getStylusLoaders,
  ip
};
