const makeEntry = require('../helpers/makeEntry')
const { CLIENT_ENTRY } = require('./constants')
const basicConfig = require('./webpack.basic.config')

const prodConfig = {
  mode: 'production',
  entry: makeEntry(CLIENT_ENTRY),
}

const extended = Object.assign({}, basicConfig, prodConfig)

module.exports = extended
