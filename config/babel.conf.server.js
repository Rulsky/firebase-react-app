const basicConfig = require('./babel.conf')

module.exports = Object.assign({}, basicConfig, {
  presets: [
    ['@babel/env', {
      targets: {
        node: '6',
      },
    }],
    ...basicConfig.presets,
  ],
  plugins: [
    ...basicConfig.plugins,
    'babel-plugin-source-map-support'],
})
