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

  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(jpg|gif|png|woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      __DEV__: true
    }),

    new webpack.HotModuleReplacementPlugin()
  ],

  devtool: 'eval-source-map'
})
