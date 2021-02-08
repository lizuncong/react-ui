const webpack = require('webpack');
const merge = require('webpack-merge');
const WatchMissingNodeModulesPlugin = require('./watchMissingNodeModulesPlugin');
const baseConfig = require('./webpack.base');
const { resolveApp } = require('./utils');

const devConfig = {
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new WatchMissingNodeModulesPlugin(resolveApp('node_modules')),
  ],
  devServer: {
    contentBase: '../dist',
    open: true,
    overlay: true,
    hot: true,
    port: 8009,
    historyApiFallback: true,
    before(app) {
      app.get('/api/repeat-list', (req, res) => {
        const { count } = req.query;
        setTimeout(() => {
          res.json({
            code: 0,
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((item, index) => ({
              title: `第${Number(count)}次请求的数据：${index + 1}`,
            })),
            count,
          });
        }, (10 - count) * 1000);
      });
    },
    // proxy: {
    // '/server': {
    //   target: 'http://localhost:8080',
    //   // secure: false, // 如果请求的网址是https，需要配置secure: false
    //   pathRewrite: {
    //     '/server': '',
    //   },
    //   changeOrigin: true,
    // },
    // },
  },
};

const config = merge(baseConfig('development'), devConfig);
module.exports = config;
