const webpack = require('webpack')
const WDS = require('webpack-dev-server')

const { info } = require('./logger')
const config = require('../config/webpack.dev.config')

const startWds = () => {
  const compiler = webpack(config)
  const options = Object.assign({},
    config.devServer)
  const server = new WDS(compiler, options)

  info('\nstarting starting webpack-dev-server\n')
  server.listen(3000)
}

module.exports = startWds
