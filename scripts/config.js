'use strict';
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const { resolve, getCssLoaders, getLessLoaders, getScssLoaders, getStylusLoaders } = require('./utils');
const {
  version,
  env,
  target,
  isEnvProduction,
  publicPath,
  isAnalyzerEnable,
  useEslint,
  destPath
} = require('./environment');

const getRules = () => {
  const rules = [
    {
      test: /\.(js|jsx)$/,
      include: [resolve('src')],
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: resolve('cache')
        }
      }
    },
    {
      test: /\.(html)$/,
      use: {
        loader: 'html-loader',
        options: {
          attrs: [':data-src']
        }
      }
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      include: [resolve('src')],
      use: {
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/img/[name].[hash:8].[ext]'
        }
      }
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      include: [resolve('src')],
      use: {
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      include: [resolve('src')],
      use: {
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:8].[ext]'
        }
      }
    },
    {
      test: /\.css$/,
      // include: [resolve('src')],
      use: getCssLoaders({
        importLoaders: 1
      })
    },
    {
      test: /\.less$/,
      // include: [resolve('src')],
      use: getLessLoaders({
        importLoaders: 2
      })
    },
    {
      test: /\.scss$/,
      // include: [resolve('src')],
      use: getScssLoaders({
        importLoaders: 2
      })
    },
    {
      test: /\.styl$/,
      // include: [resolve('src')],
      use: getStylusLoaders({
        importLoaders: 2
      })
    }
  ];
  if (isEnvProduction && useEslint) {
    rules.unshift({
      test: /\.(js|jsx)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: [resolve('src')]
    });
  }
  return rules;
};

const getOptimization = () => {
  const optimizations = {
    runtimeChunk: true
  };
  if (isEnvProduction) {
    optimizations.minimizer = [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2
          },
          mangle: {
            safari10: true
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true
          }
        },
        parallel: true,
        cache: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          map: {
            inline: false,
            annotation: true
          }
        }
      })
    ];
  }
  return optimizations;
};

const getPlugin = () => {
  const plugins = [
    new webpack.DefinePlugin({
      'process.env.VERSION': JSON.stringify(version),
      'process.env.NODE_ENV': JSON.stringify(env),
      'process.env.TARGET': JSON.stringify(target)
    }), // 全局变量替换
    new webpack.NoEmitOnErrorsPlugin(), // 编译错误时跳过输出阶段
    new HtmlWebpackPlugin({
      title: '前端页面制作工具',
      filename: path.join(destPath, 'index.html'),
      template: resolve('src/template/index.template'),
      favicon: resolve('src/template/favicon.ico'),
      // gtag: 'UA-135935262-1',
      zoom: `<script>${fs.readFileSync(resolve('src/template/zoom.js'))}</script>`,
      loading: {
        html: fs.readFileSync(resolve('src/template/loading/index.html')),
        css: `<style>${fs.readFileSync(resolve('src/template/loading/index.css'))}</style>`
      },
      inject: true,
      chunksSortMode: isEnvProduction ? 'dependency' : 'auto',
      minify: isEnvProduction
        ? {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        }
        : false
    }) // 通过模板创建html
  ];
  if (isEnvProduction) {
    return plugins
      .concat([
        new webpack.ProgressPlugin(),
        isAnalyzerEnable &&
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: path.join(destPath, 'report/index.html')
          }),
        new MiniCssExtractPlugin({
          filename: 'static/css/[name].[contenthash:8].css',
          chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
        }),
        new webpack.optimize.ModuleConcatenationPlugin(), // 作用域提升优化
        new webpack.optimize.SplitChunksPlugin({
          chunks: 'all',
          minSize: 30000,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          automaticNameDelimiter: '~',
          name: true,
          cacheGroups: {
            react: {
              // 所有react开头的单独打一个包
              test: /[\\/]node_modules[\\/]react/,
              priority: -20
            },
            vendors: {
              // 所有node_modules的单独打一个包
              test: /[\\/]node_modules[\\/]/,
              priority: -100
            },
            default: {
              minChunks: 2,
              priority: -10,
              reuseExistingChunk: true
            }
          }
        }), // 代码拆分优化
        new ManifestPlugin({
          fileName: 'asset-manifest.json',
          publicPath: publicPath
        })
      ])
      .filter(Boolean);
  } else {
    return plugins
      .concat([
        new webpack.HotModuleReplacementPlugin(), // 模块热替换插件
        new webpack.NamedModulesPlugin() // 当开启 HMR 的时候使用该插件会显示模块的相对路径
      ])
      .filter(Boolean);
  }
};

function getConfig() {
  const config = {
    mode: env,
    devtool: isEnvProduction ? 'source-map' : 'cheap-module-eval-source-map',
    context: resolve(),
    entry: {
      index: resolve('src/index.js')
    },
    output: {
      path: destPath,
      filename: isEnvProduction ? 'static/js/[name].[chunkhash:8].js' : 'static/js/bundle.js',
      chunkFilename: isEnvProduction ? 'static/js/[name].[chunkhash:8].chunk.js' : 'static/js/[name].chunk.js',
      publicPath: isEnvProduction ? publicPath : '/'
    },
    optimization: getOptimization(),
    resolve: {
      extensions: ['.js', '.json', '.jsx'],
      modules: [resolve('src'), 'node_modules'],
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
      rules: getRules()
    },
    externals: {},
    plugins: getPlugin(),
    devServer: require('./server')
  };

  return config;
}
const config = getConfig();
module.exports = config;
