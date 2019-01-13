const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'development',

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
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(jpg|gif|png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          fallback: 'file-loader',
          // outputPath: '/assets/fonts',
          // name: '[name].[ext]?hash=[hash]'
        }
      }
    ]
  },

  devServer: {
    compress: true,
    disableHostCheck: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    hot: true,
    port: 7001
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),

    new webpack.HotModuleReplacementPlugin()
  ],

  target: 'web',

  devtool: 'cheap-module-eval-source-map'
}
