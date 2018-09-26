/* eslint-disable import/no-extraneous-dependencies */
const { HotModuleReplacementPlugin } = require('webpack')

const { HOSTING_DIR, CLIENT_ENTRY } = require('./constants')
const babelConfig = require('./babel.conf.wds')

module.exports = {
  mode: 'development',
  entry: [
    CLIENT_ENTRY,
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
  ],
  output: {
    filename: 'bundle.js',
    path: HOSTING_DIR,
    publicPath: '/', // TODO - we need proper public path, storage and handling for static assets
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', options: babelConfig,
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new HotModuleReplacementPlugin(),
  ],
}
