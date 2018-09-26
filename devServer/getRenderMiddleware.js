require('@babel/register')(require('../config/babel.conf.server'))
const { join } = require('path')
const { SRC_DIR } = require('../config/constants')

module.exports = () => {
  try {
    const joined = join(SRC_DIR, 'server', 'renderMiddleware.js')
    /* eslint-disable-next-line import/no-dynamic-require, global-require */
    return require(joined).default
  } catch (error) {
    return (req, res, next) => { next() }
  }
}
