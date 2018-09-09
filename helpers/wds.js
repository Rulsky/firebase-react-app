const webpack = require('webpack')
const WDS = require('webpack-dev-server')

const config = require('../config/webpack.dev.config')

const startWds = () => {
  const compiler = webpack(config)
  const options = Object.assign({},
    config.devServer)
  const server = new WDS(compiler, options)
  console.log('======= starting wds =======')
  server.listen()
}

module.exports = startWds
