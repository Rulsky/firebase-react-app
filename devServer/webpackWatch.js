const webpack = require('webpack')

const wpConfig = require('../config/webpack.prod.config')

const { log } = console

const webpackWatch = () => {
  log('starting webpack watch')
  const compiler = webpack(wpConfig)
  compiler.watch({
    aggregateTimeout: 300,
    poll: 1000,
  }, () => {
    log('started watch')
  })
}

module.exports = webpackWatch
