const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  target: 'node',
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  devtool: 'inline-cheap-module-source-map'
};
