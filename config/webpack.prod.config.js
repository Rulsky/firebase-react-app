/* eslint-disable import/no-extraneous-dependencies */
const { join } = require('path')

const { FBS_CONF } = require('./constants')
const babelConfig = require('./babel.conf.webpackProd.js')

module.exports = {
  mode: 'production',
  entry: [
    './src/client/index.js',
  ],
  output: {
    filename: 'bundle.js',
    path: join(process.cwd(), FBS_CONF.hosting.public),
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
}
