const { createTransformer } = require('babel-jest')
const babelConfig = require('./config/babel.conf.jest')

module.exports = createTransformer({
  plugins: babelConfig.plugins,
  presets: babelConfig.presets,
})
