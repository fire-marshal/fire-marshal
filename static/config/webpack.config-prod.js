const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const common = require('./webpack.config-common')

module.exports = merge(common, {
  mode: 'production',

  devtool: 'source-map',

  target: 'web',

  plugins: [
    new webpack.ProgressPlugin(),

    new CleanWebpackPlugin(
      ['dist'],
      {
        root: path.resolve(__dirname, '..')
      })
  ]
})
