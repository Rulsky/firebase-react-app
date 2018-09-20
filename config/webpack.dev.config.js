/* eslint-disable import/no-extraneous-dependencies */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { HotModuleReplacementPlugin } = require('webpack')
const { join } = require('path')

const { FBS_CONF } = require('./constants')
const babelConfig = require('./babel.conf.wds')

const template = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>WDS</title>
</head>
<body>
  <div id="root"></div>
</html>
`

module.exports = {
  mode: 'development',
  entry: [
    './src/client/index.js',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
  ],
  output: {
    filename: 'bundle.js',
    path: join(process.cwd(), FBS_CONF.hosting.public),
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
    new HtmlWebpackPlugin({ templateContent: template }),
    new HotModuleReplacementPlugin(),
  ],
}
