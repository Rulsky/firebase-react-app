/* eslint-disable import/no-extraneous-dependencies */
const { HotModuleReplacementPlugin } = require('webpack')

const makeEntry = require('../helpers/makeEntry')
const { CLIENT_ENTRY } = require('./constants')
const basicConfig = require('./webpack.basic.config')

const whmEntry = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'


const devConfig = {
  mode: 'development',
  entry: makeEntry(CLIENT_ENTRY, whmEntry),
  plugins: [
    new HotModuleReplacementPlugin(),
  ],
}

const extended = Object.assign({}, basicConfig, devConfig)

module.exports = extended
