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
    ['babel-plugin-styled-components', {
      ssr: true,
      displayName: process.env.BABEL_ENV === 'development',
    }],
    ...basicConfig.plugins,
    'babel-plugin-source-map-support'],
})
