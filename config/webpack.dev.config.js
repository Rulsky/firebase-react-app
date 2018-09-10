/* eslint-disable import/no-extraneous-dependencies */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { HotModuleReplacementPlugin } = require('webpack')
const { join } = require('path')

const { FBS_CONF } = require('./constants')
const getFraConfig = require('../helpers/getFraConfig')
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
const fraConfig = getFraConfig()
let proxy = {
  '/api': 'http://localhost:5000',
}
if (fraConfig && fraConfig.proxy) {
  proxy = fraConfig.proxy // eslint-disable-line prefer-destructuring
}
module.exports = {
  mode: 'development',
  entry: './src/client/index.js',
  output: {
    filename: 'bundle.js',
    path: join(process.cwd(), FBS_CONF.hosting.public),
  },
  devServer: {
    hot: true,
    port: 3000,
    noInfo: true,
    proxy,
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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ templateContent: template }),
    new HotModuleReplacementPlugin(),
  ],
}
