const webpack = require('webpack')

const wpConfig = require('../config/webpack.prod.config')

const webpackWatch = () => {
  const compiler = webpack(wpConfig)
  compiler.watch()
}

module.exports = webpackWatch
