const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  module: {
    rules: [
      // we those rules build takes longer
      // but maybe because we have small styles yet
      // would compare for bigger style files
      { test: /\.scss$/, loader: 'null-loader' },
      { test: /\.css$/, loader: 'null-loader' }
    ]
  },
  target: 'node',
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  devtool: 'inline-cheap-module-source-map'
};
