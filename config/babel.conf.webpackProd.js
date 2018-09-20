const basicConfig = require('./babel.conf')

module.exports = Object.assign({}, basicConfig, {
  presets: [
    ['@babel/env', {
      targets: '> 0.25%, not dead',
    }],
    ...basicConfig.presets,
  ],
  plugins: [
    'babel-plugin-styled-components',
    ...basicConfig.plugins,
    'react-hot-loader/babel'],
})
