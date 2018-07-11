'use strict';
const path = require('path');
const { assetsPath } = require('./utils');
const config = require('../config');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}
module.exports = {
  context: path.resolve(),
  entry: resolve('src/index.js'),
  output: {
    path: resolve('dist'),
    filename: 'main.js',
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.less'],
    alias: {
      '@src': resolve('src'),
      '@utils': resolve('src/utils'),
      '@services': resolve('src/services'),
      '@routes': resolve('src/routes'),
      '@components': resolve('src/components'),
      '@units': resolve('src/components/units')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: resolve('cache')
        },
        include: [resolve('src')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        include: [resolve('src')]
      }
    ]
  }
};
