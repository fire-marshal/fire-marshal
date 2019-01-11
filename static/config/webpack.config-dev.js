const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')


module.exports = {
  mode: 'development',

  module: {
    rules: [
      // TODO: setup styles
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      { test: /\.css$/, loader: 'null-loader' }, {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(jpg|gif|png|woff|woff2|eot|ttf|svg)$/,
        loader: 'null-loader'
      }
    ]
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({ template: './public/index.html' })
  ],

  target: 'web',

  devtool: 'inline-cheap-module-source-map'
};
