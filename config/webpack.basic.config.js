const { join } = require('path')

const { HOSTING_DIR, CLIENT_ENTRY } = require('./constants')
const babelConfig = require('./babel.conf.wds')

module.exports = {
  entry: [
    CLIENT_ENTRY,
  ],
  output: {
    filename: '[name].bundle.js',
    path: HOSTING_DIR,
    publicPath: '/',
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
  resolve: {
    alias: {
      react: join(process.cwd(), 'node_modules', 'react'),
      styled: join(process.cwd(), 'node_modules', 'styled-components'),
    },
  },
}
