const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const common = require('./webpack.config-common')

module.exports = merge(common, {
  mode: 'production',

  devtool: 'source-map',

  target: 'web',

  output: {
    filename: '[name].[contenthash].js'
  },

  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(jpg|gif|png|woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              fallback: 'file-loader',
              // outputPath: '/assets/fonts',
              // name: '[name].[ext]?hash=[hash]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {}
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.ProgressPlugin(),

    new CleanWebpackPlugin(
      ['dist'],
      {
        root: path.resolve(__dirname, '..')
      }
    ),

    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    })
  ]
})