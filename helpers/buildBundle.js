const webpack = require('webpack')

const config = require('../config/webpack.prod.config.js')

const compiler = webpack(config)

module.exports = () => compiler.run()
