const nodeExternals = require('webpack-node-externals')
const path = require('path')

const isCoverage = process.env.NODE_ENV === 'coverage'

module.exports = {
  mode: 'development',
  module: {
    rules: [].concat(
      isCoverage ? {
        test: /\.(js|ts)/,
        include: path.resolve('src'), // instrument only testing sources with Istanbul, after ts-loader runs
        loader: 'istanbul-instrumenter-loader',
        query: {
          esModules: true
        }
      } : [],
      // we those rules build takes longer
      // but maybe because we have small styles yet
      // would compare for bigger style files
      { test: /\.scss$/, loader: 'null-loader' },
      { test: /\.css$/, loader: 'null-loader' }, {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(jpg|gif|png|woff|woff2|eot|ttf|svg)$/,
        loader: 'null-loader'
      }
    )
  },
  target: 'node',
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  devtool: 'inline-cheap-module-source-map'
}
