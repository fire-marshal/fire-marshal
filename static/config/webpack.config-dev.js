const webpack = require('webpack')
const merge = require('webpack-merge')

const common = require('./webpack.config-common')

module.exports = merge(common, {
  mode: 'development',

  target: 'web',

  devServer: {
    compress: true,
    disableHostCheck: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    hot: true,
    port: 7001
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  devtool: 'cheap-module-eval-source-map'
})
