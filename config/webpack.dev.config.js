const webpack = require('webpack')

const babelConfig = require('./babel.conf')
const { CLIENT_ENTRY } = require('./constants')

module.exports = {
  mode: 'development',
  entry: [
    CLIENT_ENTRY,
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
  ],
  output: {
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: babelConfig,
      },
    }],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
}
