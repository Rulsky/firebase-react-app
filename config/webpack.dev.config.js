const webpack = require('webpack')

const babelConfig = require('./babel.conf')
const { CLIENT_ENTRY } = require('./constants')

module.exports = {
  mode: 'development',
  entry: [
    CLIENT_ENTRY,
  ],
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json', 'jsx'],
  },
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
  devServer: {
    hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
}
