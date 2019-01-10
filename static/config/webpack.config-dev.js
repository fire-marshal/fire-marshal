module.exports = {
  mode: 'development',

  module: {
    rules: [
      // TODO: setup styles
      { test: /\.scss$/, loader: 'null-loader' },
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

  target: 'web',

  devtool: 'inline-cheap-module-source-map'
};
